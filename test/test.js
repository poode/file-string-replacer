const { replaceStrList } = require('../')

strFromList = [
  // 'اهلا بك  , هل تريد طلب ما ؟',
  // 'Hi , Do you want to make order ?',
  // '<call>',
  // 'language',
  // 'Hi, choose your replaced string عربي كمان ?',
  '\'text\': "Arabic" , "value":"arabic" ,"type":"button" '
];

strToList = [
  // 'replaced string عربي كمان',
  // 'replaced string عربي كمان',
  'replaced string عربي كمان',
];

replaceStrList({
  // filePath: '/home/poode/Desktop/rest.rive',
  filePath: '/tmp/file.rive',
  strFromList,
  strToList,
}).catch(e => console.log(e));