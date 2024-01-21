/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  return arr.slice().sort(param == 'asc' ? sensitiveSorter : (a, b) => -1 * sensitiveSorter(a, b));
}

function sensitiveSorter(a, b) {

  if (a.toLowerCase() == b.toLowerCase()) {
    return a.charAt(0).toUpperCase() == a.charAt(0) ? -1 : 1;
  }

  return a.localeCompare(b, 'ru', { sensitivity: 'case' });
}
