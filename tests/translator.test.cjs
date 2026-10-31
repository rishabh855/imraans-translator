const fs = require('node:fs');
const assert = require('node:assert/strict');
const test = require('node:test');
const ts = require('typescript');

// Compile the actual TypeScript modules in memory, without a new runtime dependency.
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText, filename);
};
const { translateMessage, extractBusNumbers, extractTimes, extractLocations, parseBusMessage } = require('../lib/translator.ts');
const { SAMPLE_MESSAGES } = require('../lib/sampleMessages.ts');
const { IMRAN_DICTIONARY } = require('../lib/dictionary.ts');
const en = text => translateMessage(text).normal.en;

for (const sample of SAMPLE_MESSAGES) {
  test(`built-in ${sample.id} retains every fleet number in every language`, () => {
    const result = translateMessage(sample.text);
    for (const translation of Object.values(result.normal)) {
      assert.doesNotMatch(translation, /verify|पुष्टि|પુષ્ટિ/);
      for (const bus of result.extractedInfo.busNumbers) assert.ok(translation.includes(bus));
    }
  });
}
for (const entry of IMRAN_DICTIONARY) {
  test(`dictionary example: ${entry.id}`, () => assert.doesNotMatch(en(entry.exampleImran), /verify/));
}

test('arbitrary buses are associated with their own origins', () => {
  const result = en('KALE BY-PASS THI 1234 TAVRATHI 5678 TAVRATHI 9012 GADI AAVSE');
  assert.match(result, /bus 1234 will arrive from By-pass/);
  assert.match(result, /bus 5678 will arrive from Tavra/);
  assert.match(result, /bus 9012 will arrive from Tavra/);
  assert.doesNotMatch(result, /0444|7460|0088/);
});
test('independent buses retain actions, dates, and times', () => {
  const result = en('AAJE BUS 1234 TAVRA THI 6:40 AM OPADSE AND KALE BUS 5678 BYPASS PAR 7:20 PM AAVSE');
  assert.match(result, /Today, bus 1234 will depart from Tavra at 6:40 AM/);
  assert.match(result, /Tomorrow, bus 5678 will arrive at By-pass at 7:20 PM/);
});
test('all transfers survive, including local return qualifier', () => {
  const text = '0001 NA STUDENT NE 0088 MA BESWANU RETURN MA AND 7460 NA STUDENT NE 6977 MA BESWANO';
  assert.deepEqual(parseBusMessage(text).transfers, [{ from: '0001', to: '0088' }, { from: '7460', to: '6977' }]);
  assert.match(en(text), /return journey.*0001.*0088.*Students.*7460.*6977/);
});
test('transfer dates, locations, times, and return context coexist', () => {
  const result = en('KALE 0444 NA STUDENT NE BY-PASS THI 7460 MAA BESVANU RETURNS MAA SANJE 7/10');
  assert.match(result, /Tomorrow.*return journey.*0444.*7460 at By-pass at 7:10 PM/);
});
test('multiple source buses remain a transfer list', () => {
  assert.deepEqual(parseBusMessage('0001/0088 NA STUDENTS NE 7460 MA BESWANU').transfers,
    [{ from: '0001', to: '7460' }, { from: '0088', to: '7460' }]);
});
test('negated arrival is not an arrival or departure', () => {
  assert.equal(en('BUS 0088 NAHI AAVSHE'), 'Bus 0088 will not arrive.');
  assert.deepEqual(parseBusMessage('BUS 0088 NAHI AAVE').actions, ['Bus Cancelled / Not Coming (બસ નહીં આવે)']);
});
test('cancellation is scoped to its bus', () => {
  assert.equal(en('BUS 1234 CANCEL AND BUS 5678 AAVSE'), 'Bus 1234 is cancelled. Bus 5678 will arrive.');
  assert.equal(parseBusMessage('BUS 1234 CANCEL NAHI').busWillNotCome, false);
  assert.equal(en('BUS 1234 CANCEL NAHI'), 'Bus 1234 is not cancelled.');
});
test('negative boarding is never a mandatory transfer', () => {
  assert.deepEqual(parseBusMessage('0088 MA NAHI BESWANU').transfers, []);
  assert.equal(en('0088 MA NAHI BESWANU'), 'Passengers must not board bus 0088.');
});
test('cancellation does not invent the cancelled fleet number', () => {
  assert.match(en('BUS NAHI AAVE AETLE 0088 NA STUDENT NE 7460 MA BESVO PADSE'), /^The bus will not arrive\. Students assigned to bus 0088/);
});
test('unspecified day and AM/PM stay unspecified', () => {
  assert.equal(en('BUS 9861 TAVRA THI 6/40 OPADSE'), 'Bus 9861 will depart from Tavra at 6:40.');
  assert.equal(parseBusMessage('BUS 9861 TAVRA THI 6/40 OPADSE').date, null);
});
test('12-hour, 24-hour, midnight, noon, and period handling', () => {
  assert.deepEqual(extractTimes('6:40 PM, 00:15, 12:00 PM, 12:00 AM, 18:30, SAVARE 5/10, SANJE 7.20, 8 PM'),
    ['6:40 PM', '12:15 AM', '12:00 PM', '12:00 AM', '6:30 PM', '5:10 AM', '7:20 PM', '8:00 PM']);
  assert.deepEqual(extractTimes('6:40 7:10'), ['6:40', '7:10']);
  assert.deepEqual(extractTimes('25:00 7:99 0001/7460 31/10/2026'), []);
});
test('dates, phone numbers, prices, and substrings are not fleet numbers', () => {
  assert.deepEqual(extractBusNumbers('31/10/2026 PHONE 9876543210 RS 1500 BUS NO. 2026 0001/7460'), ['2026', '0001', '7460']);
  assert.deepEqual(extractBusNumbers('12345 123456 6:40'), []);
});
test('bus counts never come from a digit inside a fleet number or time', () => {
  assert.equal(en('BUS 1234 OPADSE 2:20 PM'), 'Bus 1234 will depart at 2:20 PM.');
  assert.equal(en('KALE TAVRATHI 2 BUS OPADSE'), 'Tomorrow, 2 buses will depart from Tavra.');
});
test('locations are not substring matches or assumed to be Bharuch', () => {
  assert.deepEqual(extractLocations('STATION BHARUCH TAVRA BY PASS'), ['Station', 'Bharuch', 'Tavra', 'By-pass']);
  assert.deepEqual(extractLocations('STATIONARY TAVRAX'), []);
});
test('unknown and ambiguous instructions are retained for verification', () => {
  for (const input of ['hello world', 'BUS 1234 LATE 20 MINUTES', 'BUS 1234', 'BUS 1234 MAYBE AAVSE', 'BUS 1234 6:40 7:20 OPADSE', 'BUS 1234 31/10/2026 OPADSE']) {
    assert.match(en(input), /Please verify/);
    assert.equal(parseBusMessage(input).confidenceScore, 0);
    assert.ok(en(input).includes(input.toUpperCase()));
  }
});
test('known spelling variants and WhatsApp formatting', () => {
  assert.equal(en('*kaale* by pass thi gaadi no. ૦૦૮૮ upadse savare 6/40'), 'Tomorrow, bus 0088 will depart from By-pass at 6:40 AM.');
  assert.match(en('7460 NA STUDNET NE 6977 MA BESVUPADSE'), /7460 must board bus 6977/);
});
test('all languages preserve evening time without adding morning', () => {
  const result = translateMessage('BUS 1234 TAVRA THI 6:40 PM OPADSE').normal;
  for (const value of Object.values(result)) assert.ok(value.includes('6:40 PM'));
  assert.doesNotMatch(result.hi, /सुबह/);
  assert.doesNotMatch(result.gu, /સવારે/);
});
test('style, language, and empty-input API stay compatible', () => {
  const result = translateMessage('', 'savage', 'gu');
  assert.equal(result.style, 'savage');
  assert.equal(result.targetLang, 'gu');
  assert.equal(result.extractedInfo.confidenceScore, 0);
  assert.ok(result.normal.en && result.funny && result.savage);
});
test('invalid times and unexplained numbers cannot become confident instructions', () => {
  for (const time of ['25:00', '6:99', '13:00 PM', '0:30 AM', '6:5', '9876543210']) {
    assert.match(en(`BUS 1234 ${time} OPADSE`), /Please verify/);
  }
});
test('shared negative or timed route lists are not split into invented positive trips', () => {
  assert.match(en('BYPASS THI 1234 TAVRATHI 5678 NAHI AAVSE'), /Please verify/);
  assert.match(en('BYPASS THI 1234 TAVRATHI 5678 6:40 AAVSE'), /Please verify/);
});
test('questions are not asserted as confirmed schedules', () => {
  assert.match(en('BUS 1234 AAVSE?'), /Please verify/);
});
test('complex sample keeps regular schedule, two arriving buses, and separate departure', () => {
  assert.equal(en(SAMPLE_MESSAGES[6].text), 'Tomorrow, the bus will arrive at the regular scheduled time. Tomorrow, buses 0001 and 7460 will arrive from Tavra. Tomorrow, bus 0444 will depart from By-pass at the regular scheduled time.');
});
