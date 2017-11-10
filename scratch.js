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

let doc = nlp('they\'d said').debug();
doc.verbs().toPastTense();
doc.debug();

// coming => com
// moving => mov
// joking => jok
// poking => pok
// naming => nam
// aching => ach
// tuning => tun
// bling => ble
// hazing => haz
// oozing => ooz
// gazing => gaz
// easing => eas
// dozing => doz
// raring => rar
// honing => hon
// fuming => fum
// razing => raz

// lied => ly
// shed => sh
// owed => ow
// aged => ag
// aced => ac
// axed => ax
// egged => eg

// Refactor
// Release
// Revert
// repeat
// rebuild
// reconcile
// record
// redefine
// recover
// restructure
// resolve

// nlp('pulled').verbs().toInfinitive().debug(); //pulle
// nlp('leaving').verbs().toInfinitive().debug(); //leav

// 5) sentence .topast/.toNegative/toPlural
// nlp('are really fun').verbs().toPastTense().debug();
// nlp('i am really walking on').verbs().toPastTense().debug();
// nlp('we\'re really fun').sentences().toPastTense().debug();
// console.log(nlp('we\'re really fun').verbs().data());
// console.log(nlp('i\'m really fun').verbs().data());
nlp('we\'re really fun').sentences().toPlural().debug();
*/
