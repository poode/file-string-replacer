# Replace String List With Another String List In Same File

## Usage

```
const { replaceStrList } = require('replace-string-in-file')

strFromList = [
  'اهلا بك  , هل تريد طلب ما ؟',
  'Hi , Do you want to make order ?',
];

strToList = [
  'replaced string عربي كمان',
  'replaced string عربي كمان',
];

replaceStrList({
  filePath: '/tmp/file.rive',
  strFromList,
  strToList,
}).catch(e => console.log(e));

```