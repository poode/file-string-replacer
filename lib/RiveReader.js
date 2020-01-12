const lineReader = require('line-reader');
const fs = require('fs');

/**
 * @class RiveReader
 */
class RiveReader {
  /**
   *Creates an instance of RiveReader.
   * @param {{filePath:string,distFilePath:string,isServerless:boolean}}{filePath,distFilePath,isServerless}
   * if `isServerless` is `true` then `distFilePath` will be `/tmp/file.rive` as it is only file system accessable for lambda function
   * @memberof RiveReader
   */
  constructor({ filePath, distFilePath, isServerless }) {
    this.filePath = filePath;
    if (isServerless) {
      this.distFilePath = '/tmp/file.rive';
    } else {
      if (!distFilePath) {
        throw new Error(
          `'${this.constructor.name}.distFilePath' is required if the you did not use isServerless paramater!`,
        );
      }
      this.distFilePath = distFilePath;
    }
    this.data = '';
  }

  readLine(iteratee) {
    return new Promise((resolve, reject) => {
      lineReader.eachLine(this.filePath, { encoding: 'utf-8' }, iteratee, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  iteratee({ strFrom, strTo }) {
    return line => {
      if (line.includes(strFrom)) {
        this.data += line.replace(strFrom, strTo) + '\n';
        return true;
      }
      else {
        this.data += line + '\n';
        return true;
      }
    };
  }


  async updateFile({ strFrom, strTo }) {
    try {
      await this.readLine(this.iteratee({
        strFrom,
        strTo
      }));
      fs.writeFileSync(this.distFilePath, this.data, {
        encoding: 'utf-8'
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  RiveReader,
};
