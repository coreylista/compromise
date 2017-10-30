const nlp = require('./src/index');
nlp.verbose('tagger');

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

var doc = nlp('turn desk lamp on at fifty percent an the lights on in the office');
let action = doc.match('(#DeviceAction|#DeviceTypeAction)+');
console.log(action.data());
