/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sortedArray = arr.slice().sort(sensitiveSorter);
  if (param == 'desc') {
    sortedArray = customReverse(sortedArray);
  }
  return sortedArray;
}

function sensitiveSorter(a, b) {

  if (a.toLowerCase() == b.toLowerCase()) {
    return a.charAt(0).toUpperCase() == a.charAt(0) ? -1 : 1;
  }

  return a.localeCompare(b, 'ru', { sensitivity: 'case' });
}

function customReverse(array) {
  let output = [];
  while (array.length) {
    output.push(array.pop());
  }
  return output;
}
