const nlp = require('./src/index');
//nlp.verbose('tagger');

const tagSets = {
    Device: {},
    Room: {},
    DeviceType: {},
    Command: {},
    Status: {},
    'aa55d3cf-acdc-4413-8b04-edf33ccef4ac': {
        isA: 'Device'
    }
};
nlp.addTags(tagSets);

const words = {
    'desk lamp': 'aa55d3cf-acdc-4413-8b04-edf33ccef4ac',
    office: 'Room',
    kitchen: 'Room',
    upstairs: 'Room',
    garage: 'Room',
    on: 'Command',
    off: 'Command',
    open: 'Command',
    close: 'Command',
    lock: 'Command',
    unlock: 'Command'
};
nlp.addWords(words);

const regEx = {
    'light(?:(?:s|es)?)': 'DeviceType'
};
nlp.addRegex(regEx);

const patterns = {
    '(#Device|#Command|#Value|#Unit)': 'DeviceAction',
    '(#DeviceType|#Command|#Value|#Unit|#Room)': 'DeviceTypeAction'
};
nlp.addPatterns(patterns);

var doc = nlp('turn desk lamp on to fifty percent for ten minutes');

let level = doc
    .values()
    .toNice()
    .noDates()
    .out();
let delay = doc.match('#Duration+');
console.log(delay);
//console.log('Level: ', level, '\nDelay: ', delay);
/*
let actions = doc.match('(#DeviceAction|#DeviceTypeAction)');

for (let i = 0; i < actions.length; i++) {
    console.log(actions.list[i].terms[0].text);
    console.log(actions.list[i].terms[0].tags);
}
*/
