import type { ExtractedBusInfo, TargetLanguage } from './types';

// Normalize only documented spellings, never fuzzy-match fleet numbers or places.
export function normalizeMessage(input: string): string {
  return input.normalize('NFKC').toUpperCase()
    .replace(/[૦-૯]/g, n => String(n.charCodeAt(0) - 0x0ae6))
    .replace(/[०-९]/g, n => String(n.charCodeAt(0) - 0x0966))
    .replace(/[‘’]/g, "'").replace(/[*_~]/g, '')
    .replace(/\b([AP])\.?M\.?\b/g, '$1M')
    .replace(/\bNO\./g, 'NO').replace(/\bBY[\s-]*PASS\b/g, 'BYPASS')
    .replace(/\bTAVRATHI\b/g, 'TAVRA THI').replace(/\bTAWARA\b/g, 'TAVRA')
    .replace(/\b(?:KAALE|KAL|TOMORROW)\b/g, 'KALE').replace(/\b(?:AAJ|AJE|TODAY)\b/g, 'AAJE')
    .replace(/\b(?:OPAADSE|OPADE|UPAADSE|UPADSE|UPADSHE|DEPART|LEAVE)\b/g, 'OPADSE')
    .replace(/\b(?:AAVSEE+|AAVSHE|AAVE|AVSE|ARRIVE|COME)\b/g, 'AAVSE')
    .replace(/\b(?:BESWANO|BESVANU|BESVANO|BESVO|BESVU|BESO|BOARD)\b/g, 'BESWANU')
    .replace(/\bBESVUPADSE\b/g, 'BESWANU PADSE').replace(/BESWANU-PADSE/g, 'BESWANU PADSE')
    .replace(/\bSTUDNETS?\b/g, 'STUDENT').replace(/\bSTUDENTS\b/g, 'STUDENT')
    .replace(/\b(?:GAADI|GADII|GADI)\b/g, 'BUS').replace(/\bREGYULAR\b/g, 'REGULAR')
    .replace(/\b(?:NAI|NAHIN|NATHI|NOT)\b/g, 'NAHI').replace(/\b(?:ETLE|ATLE|THEREFORE)\b/g, 'AETLE')
    .replace(/\bMAA\b/g, 'MA').replace(/\bRETURNS\b/g, 'RETURN')
    .replace(/\bTI\b/g, 'THI').replace(/\bBE-BUS\b/g, 'BE BUS')
    .replace(/[\t ]+/g, ' ').trim();
}

const unique = <T,>(items: T[]): T[] => [...new Set(items)];
const datePattern = /\b\d{1,4}[/-]\d{1,2}[/-]\d{2,4}\b/g;
const clockPattern = /\b(?:[01]?\d|2[0-3])[:/.][0-5]\d(?:\s*[AP]M)?\b|\b(?:0?[1-9]|1[0-2])\s*[AP]M\b/g;
const placePattern = /\b(?:BYPASS|TAVRA|COLLEGE(?: CAMPUS)?|CAMPUS|BHARUCH(?: STATION)?|STATION)\b/g;
const verbPattern = /\b(?:OPADSE|AAVSE|BESWANU|CANCEL(?:LED|ED)?)\b/g;
const negativePattern = /\bNAHI\b/;
type Action = 'depart' | 'arrive' | 'board' | 'cancel' | 'uncancel';
interface Place { name: string; relation: 'from' | 'to' | 'at' }
interface Clause {
  source: string;
  buses: string[];
  transfers: { from: string; to: string }[];
  places: Place[];
  times: string[];
  day?: 'today' | 'tomorrow';
  returning: boolean;
  regular: boolean;
  action?: Action;
  negative: boolean;
  count?: number;
  uncertain: boolean;
}

export function busNumbers(input: string): string[] {
  const text = normalizeMessage(input).replace(datePattern, '').replace(clockPattern, '');
  return unique([...text.matchAll(/\b\d{3,4}\b/g)].filter(m => {
    const before = text.slice(0, m.index);
    const after = text.slice(m.index! + m[0].length);
    return !/(?:YEAR|DATE|PHONE|MOBILE|RS|INR)\s*$/.test(before) && !/^\s*(?:RS|RUPEES|MINUTES|MIN|KM)\b/.test(after);
  }).map(m => m[0]));
}

export function messageTimes(input: string): string[] {
  const text = normalizeMessage(input).replace(datePattern, '');
  return unique([...text.matchAll(clockPattern)].map((m, index, matches) => {
    const parts = m[0].match(/^(\d{1,2})(?:[:/.](\d{2}))?\s*([AP]M)?$/)!;
    const hours = Number(parts[1]);
    const minutes = parts[2] || '00';
    // Use a nearby period only; explicit AM/PM always wins. Never infer from a return trip.
    const start = index ? matches[index - 1].index! + matches[index - 1][0].length : 0;
    const end = matches[index + 1]?.index ?? text.length;
    const before = text.slice(start, m.index);
    const after = text.slice(m.index! + m[0].length, end);
    const period = before.match(/\b(SAVARE|SAVAR|MORNING|SANJE|SANJ|EVENING|BAPORE|AFTERNOON|RATRE|NIGHT)\s*$/)?.[1]
      || after.match(/^\s*(SAVARE|SAVAR|MORNING|SANJE|SANJ|EVENING|BAPORE|AFTERNOON|RATRE|NIGHT)\b/)?.[1];
    let meridiem = parts[3];
    if (!meridiem && hours > 0 && hours <= 12 && period) {
      meridiem = /SAVAR|MORNING/.test(period) ? 'AM' : /RATRE|NIGHT/.test(period) && hours < 6 ? 'AM' : 'PM';
    }
    if (hours === 0 || hours > 12) return `${hours === 0 ? 12 : hours - 12}:${minutes} ${hours === 0 ? 'AM' : 'PM'}`;
    return `${hours}:${minutes}${meridiem ? ` ${meridiem}` : ''}`;
  }));
}

function placesIn(text: string): Place[] {
  return [...text.matchAll(placePattern)].map(m => {
    const tail = text.slice(m.index! + m[0].length);
    const head = text.slice(0, m.index);
    const relation = /^\s*THI\b/.test(tail) || /\bFROM\s*$/.test(head) ? 'from'
      : /^\s*(?:SUDHI|TARAF)\b/.test(tail) || /\bTO\s*$/.test(head) ? 'to' : 'at';
    const name = m[0] === 'BYPASS' ? 'By-pass' : m[0] === 'TAVRA' ? 'Tavra'
      : /COLLEGE|CAMPUS/.test(m[0]) ? 'College Campus' : m[0] === 'BHARUCH STATION' ? 'Bharuch Station'
      : m[0] === 'BHARUCH' ? 'Bharuch' : 'Station';
    return { name, relation };
  });
}

export function messageLocations(input: string): string[] {
  return unique(placesIn(normalizeMessage(input)).map(p => p.name));
}

function transferPairs(text: string): { from: string; to: string }[] {
  if (!/\bBESWANU\b/.test(text) || negativePattern.test(text)) return [];
  const pairs: { from: string; to: string }[] = [];
  const re = /\b(\d{3,4}(?:\s*(?:\/|,|AND|ANE|&)\s*\d{3,4})*)\s+NA\s+STUDENT(?:\s+NE)?\b(?:(?!\bSTUDENT\b|[;.!?]).)*?\b(\d{3,4})\s+MA\b/g;
  for (const m of text.matchAll(re)) {
    for (const from of busNumbers(m[1])) if (from !== m[2]) pairs.push({ from, to: m[2] });
  }
  return pairs;
}

// A conjunction is a boundary only after a completed predicate; bus lists stay together.
function splitClauses(text: string): string[] {
  const sentences = text.replace(/(?<=\d)\.(?=\d)/g, ':')
    .split(/(?:[.!;\n]+|(?<=\?)\s+|\s+\bAETLE\b\s+)/).map(s => s.trim()).filter(Boolean);
  return sentences.flatMap(sentence => {
    const pieces: string[] = [];
    let start = 0;
    for (const m of sentence.matchAll(/\s+(?:AND|ANE|BUT|PAN|&)\s+|,\s*/g)) {
      if (new RegExp(verbPattern.source).test(sentence.slice(start, m.index))) {
        pieces.push(sentence.slice(start, m.index).trim());
        start = m.index! + m[0].length;
      }
    }
    pieces.push(sentence.slice(start).trim());
    return pieces.filter(Boolean).flatMap(piece => {
      // Repeated origin-before-fleet lists share their final predicate, not hard-coded routes.
      const origins = [...piece.matchAll(/\b(?:BYPASS|TAVRA|COLLEGE|CAMPUS|BHARUCH|STATION)\s+THI\b/g)];
      const verbs = [...piece.matchAll(verbPattern)];
      if (origins.length > 1 && verbs.length === 1 && !negativePattern.test(piece)
        && messageTimes(piece).length === 0 && verbs[0].index! > origins.at(-1)!.index!
        && !/\bSTUDENT\b/.test(piece) && busNumbers(piece.slice(0, origins[0].index)).length === 0) {
        const ending = piece.slice(verbs[0].index);
        return origins.map((origin, i) => `${i === 0 ? piece.slice(0, origin.index) : ''}${piece.slice(origin.index, origins[i + 1]?.index)}${i < origins.length - 1 ? ` ${ending}` : ''}`);
      }
      return [piece];
    });
  });
}

const knownWords = new Set(('KALE AAJE BUS NO NUMBER NA STUDENT NE MA THI SUDHI TARAF OPADSE AAVSE BESWANU PADSE NAHI CANCEL CANCELLED CANCELED RETURN REGULAR TIME TIMING PAR AT FROM TO AND ANE BUT PAN BYPASS TAVRA COLLEGE CAMPUS BHARUCH STATION SAVARE SAVAR MORNING SANJE SANJ EVENING BAPORE AFTERNOON RATRE NIGHT AM PM EK BE WILL THE IS ARE PLEASE').split(' '));

function clausesFor(input: string): Clause[] {
  const text = normalizeMessage(input);
  let day: Clause['day'];
  return splitClauses(text).map(source => {
    if (/\bKALE\b/.test(source)) day = 'tomorrow';
    if (/\bAAJE\b/.test(source)) day = 'today';
    const verbs = [...source.matchAll(verbPattern)].map(m => m[0]);
    const negative = negativePattern.test(source);
    const cancel = verbs.some(v => v.startsWith('CANCEL'));
    const action: Action | undefined = cancel ? negative ? 'uncancel' : 'cancel'
      : verbs.includes('BESWANU') ? 'board' : verbs.includes('OPADSE') ? 'depart' : verbs.includes('AAVSE') ? 'arrive' : undefined;
    const countMatch = source.match(/\b(EK|BE|\d{1,2})\s+BUS\b|\bBUS\s+(EK|BE|\d{1,2})\b/);
    const countToken = countMatch?.[1] || countMatch?.[2];
    const count = countToken ? countToken === 'EK' ? 1 : countToken === 'BE' ? 2 : Number(countToken) : undefined;
    const unknown = source.replace(clockPattern, '').match(/\p{L}+/gu)?.filter(word => !knownWords.has(word)) || [];
    const times = messageTimes(source);
    const buses = busNumbers(source);
    const transfers = transferPairs(source);
    const invalidTime = [...source.matchAll(/\b(\d{1,2})[:/.](\d{1,2})(?:\s*([AP]M))?\b/g)]
      .some(m => Number(m[1]) > 23 || Number(m[2]) > 59 || m[2].length !== 2 || (m[3] && (Number(m[1]) < 1 || Number(m[1]) > 12)));
    const unassignedNumbers = source.replace(clockPattern, '').replace(/\b\d{3,4}\b/g, '')
      .replace(/\b(?:\d{1,2}\s+BUS|BUS\s+\d{1,2})\b/g, '');
    const places = placesIn(source);
    const uncertain = unknown.length > 0 || !action || times.length > 1 || datePattern.test(source) || invalidTime || source.includes('?')
      || /\d/.test(unassignedNumbers) || places.filter(p => p.relation === 'from').length > 1
      || new Set(verbs).size > 1 || (action === 'board' && /\bSTUDENT\b/.test(source) && transfers.length === 0)
      || (/\bKALE\b/.test(source) && /\bAAJE\b/.test(source));
    datePattern.lastIndex = 0;
    return { source, buses, transfers, places, times, day,
      returning: /\bRETURN\b/.test(source), regular: /\bREGULAR\b/.test(source), action, negative, count, uncertain };
  });
}

export function messageTransfers(input: string): { from: string; to: string }[] {
  return clausesFor(input).flatMap(c => c.uncertain ? [] : c.transfers);
}

export function analyzeMessage(input: string): ExtractedBusInfo {
  const clauses = clausesFor(input);
  const safe = clauses.filter(c => !c.uncertain);
  const transfers = safe.flatMap(c => c.transfers);
  const actions: string[] = [];
  if (safe.some(c => c.action === 'depart' && !c.negative)) actions.push('Departure (ઉપડશે)');
  if (safe.some(c => c.action === 'arrive' && !c.negative)) actions.push('Arrival (આવશે)');
  if (safe.some(c => c.action === 'board' && !c.negative)) actions.push('Boarding (બેસવાનું)');
  const busWillNotCome = safe.some(c => c.action === 'cancel' || (c.action === 'arrive' && c.negative));
  if (busWillNotCome) actions.push('Bus Cancelled / Not Coming (બસ નહીં આવે)');
  const times = unique(clauses.flatMap(c => c.times));
  const days = unique(clauses.map(c => c.day).filter(Boolean));
  const notes = transfers.map(t => `Students from bus ${t.from} must board bus ${t.to}.`);
  if (times.some(t => !/[AP]M$/.test(t))) notes.push('AM/PM is not specified; times are preserved without guessing.');
  if (clauses.some(c => c.uncertain)) notes.push('Some clauses could not be reliably interpreted. Check the original wording shown in the translation.');
  if (days.length > 1) notes.push('Different clauses refer to different days.');
  return {
    busNumbers: busNumbers(input), transfers, locations: messageLocations(input), times,
    date: days.length === 1 ? days[0] === 'tomorrow' ? 'Tomorrow (કાલે)' : 'Today (આજે)' : null,
    actions, isReturnJourney: safe.some(c => c.returning), busWillNotCome,
    isRegularTime: safe.some(c => c.regular),
    // Parsing coverage is a heuristic, not a measured probability of correctness.
    confidenceScore: clauses.length ? Math.round(95 * safe.length / clauses.length) : 0,
    notes,
  };
}

const placeNames: Record<string, [string, string, string]> = {
  'By-pass': ['By-pass', 'बाय-पास', 'બાય-પાસ'], Tavra: ['Tavra', 'तावरा', 'તાવરા'],
  'College Campus': ['College Campus', 'कॉलेज परिसर', 'કોલેજ કેમ્પસ'],
  'Bharuch Station': ['Bharuch Station', 'भरूच स्टेशन', 'ભરૂચ સ્ટેશન'],
  Bharuch: ['Bharuch', 'भरूच', 'ભરૂચ'], Station: ['Station', 'स्टेशन', 'સ્ટેશન'],
};

function renderClause(c: Clause, lang: TargetLanguage): string {
  const i = lang === 'en' ? 0 : lang === 'hi' ? 1 : 2;
  const pick = (en: string, hi: string, gu: string) => [en, hi, gu][i];
  if (c.uncertain) return pick('Please verify this part of the original message', 'मूल संदेश के इस हिस्से की पुष्टि करें', 'મૂળ સંદેશના આ ભાગની પુષ્ટિ કરો') + `: “${c.source}”`;
  const day = c.day === 'tomorrow' ? pick('Tomorrow, ', 'कल, ', 'કાલે, ') : c.day === 'today' ? pick('Today, ', 'आज, ', 'આજે, ') : '';
  const returning = c.returning ? pick('during the return journey, ', 'वापसी के सफर में, ', 'પરત મુસાફરીમાં, ') : '';
  const joiner = pick(' and ', ' और ', ' અને ');
  const plural = c.buses.length > 1 || (c.count ?? 1) > 1;
  const subject = c.buses.length ? pick(plural ? 'buses ' : 'bus ', 'बस ', 'બસ ') + c.buses.join(joiner)
    : c.count ? `${c.count} ${pick(plural ? 'buses' : 'bus', plural ? 'बसें' : 'बस', plural ? 'બસો' : 'બસ')}` : pick('the bus', 'बस', 'બસ');
  const places = c.places.map(p => {
    const name = placeNames[p.name][i];
    const relation = c.action === 'board' ? 'at' : p.relation;
    return i === 0 ? ` ${relation} ${name}` : ` ${name} ${relation === 'from' ? pick('', 'से', 'થી') : relation === 'to' ? pick('', 'तक', 'સુધી') : pick('', 'पर', 'પર')}`;
  }).join('');
  const time = c.times.length ? pick(` at ${c.times[0]}`, ` ${c.times[0]} बजे`, ` ${c.times[0]} વાગ્યે`)
    : c.regular ? pick(' at the regular scheduled time', ' नियमित समय पर', ' નિયમિત સમયે') : '';
  let body: string;
  if (c.action === 'board') {
    const destination = c.transfers.length ? unique(c.transfers.map(t => t.to)) : c.buses;
    const source = unique(c.transfers.map(t => t.from));
    const students = source.length ? pick(`students assigned to bus ${source.join(joiner)}`, `बस ${source.join(joiner)} के छात्रों को`, `બસ ${source.join(joiner)} ના વિદ્યાર્થીઓએ`) : pick('passengers', 'यात्रियों को', 'મુસાફરોએ');
    const target = destination.length ? pick(`bus ${destination.join(joiner)}`, `बस ${destination.join(joiner)}`, `બસ ${destination.join(joiner)}`) : pick('the bus', 'बस', 'બસ');
    body = pick(`${students} must ${c.negative ? 'not ' : ''}board ${target}${places}${time}`,
      `${students}${places}${time} ${target} में ${c.negative ? 'नहीं बैठना है' : 'बैठना होगा'}`,
      `${students}${places}${time} ${target} માં ${c.negative ? 'બેસવાનું નથી' : 'બેસવાનું રહેશે'}`);
  } else {
    const verbs: Record<Exclude<Action, 'board'>, [string, string, string]> = {
      depart: [c.negative ? 'will not depart' : 'will depart', c.negative ? 'रवाना नहीं होगी' : 'रवाना होगी', c.negative ? 'નહીં ઉપડે' : 'ઉપડશે'],
      arrive: [c.negative ? 'will not arrive' : 'will arrive', c.negative ? 'नहीं आएगी' : 'आएगी', c.negative ? 'નહીં આવે' : 'આવશે'],
      cancel: ['is cancelled', 'रद्द है', 'રદ છે'], uncancel: ['is not cancelled', 'रद्द नहीं है', 'રદ નથી'],
    };
    let verb = verbs[c.action as Exclude<Action, 'board'>][i];
    if (plural) verb = i === 0 ? verb.replace(/^is /, 'are ') : i === 1 ? verb.replace(/होगी/g, 'होंगी').replace(/आएगी/g, 'आएंगी').replace(/है/g, 'हैं') : verb;
    body = i === 0 ? `${subject} ${verb}${places}${time}` : `${subject}${places}${time} ${verb}`;
  }
  const result = day + returning + body;
  return result.charAt(0).toUpperCase() + result.slice(1) + pick('.', '।', '.');
}

export function translateAccurately(input: string): Record<TargetLanguage, string> {
  const clauses = clausesFor(input);
  const render = (lang: TargetLanguage) => clauses.length ? clauses.map(c => renderClause(c, lang)).join(' ')
    : { en: 'Please enter a bus announcement.', hi: 'कृपया बस का संदेश दर्ज करें।', gu: 'કૃપા કરીને બસનો સંદેશ લખો.' }[lang];
  return { en: render('en'), hi: render('hi'), gu: render('gu') };
}
