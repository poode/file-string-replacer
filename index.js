const { RiveReader } = require('./lib/RiveReader');

/**
 * @param {{filePath: string, strFrom: string, strTo: string}} {
 *     filePath,
 *     strFrom,
 *     strTo
 *   }
 */
async function replacer({
    filePath,
    strFrom,
    strTo,
  }) {
  try {
    const options = {
      filePath,
      distFilePath: filePath,
    }
    const RiveReaderInstance = new RiveReader(options);

    await RiveReaderInstance.updateFile.bind(RiveReaderInstance, {
      strFrom,
      strTo
    })();
  } catch (error) {
    throw error;
  }
}


/**
 *`filePath`
 * is the file path which we will replace strings inside.*`strFromList`
 * is array of strings which will be replaced.*`strToList`
 * is array of strings which will be used instead of replaced strings in `strFromList`
 * @param {{filePath: string,strFromList: string[],strToList: string[]}} {filePath, strFromList, strToList}
 */
async function replaceStrList({
  filePath,
  strFromList,
  strToList
}) {
  try {

    if (strFromList.length === 0 || strToList.length === 0) {
      throw new Error(`in ${replaceStrList.name} \n "strFromList" Array(string list which will be replaced) must not be empty or "strToList" Array(string list which will be used instead)!`);
    }

    if (strFromList.length !== strToList.length) {
      throw new Error(`in ${replaceStrList.name} \n "strFromList" Array(string list which will be replaced) must has the same length same as "strToList" Array(string list which will be used instead)!`);
    }

    async function cb(ii) {
      await replacer({
        filePath,
        strFrom: strFromList[ii],
        strTo: strToList[ii],
      });
    }


    for (let i = 0; i < strFromList.length; i += 1) {
      setTimeout(await cb.bind(cb, i), i * 10);
    };
  } catch (error) {
    throw error;
  }
}


module.exports = {
  replaceStrList,
};
