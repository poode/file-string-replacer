/**
 * Determines whether all the members of an array satisfy the specified test.
 *
 * @param {string[]} array
 * @returns
 */
function checkNonEmptyElementInArray(array) {
  return array.every(function (i) {
    return typeof i === "string"
  });
}
module.exports = {
  checkNonEmptyElementInArray,
};
