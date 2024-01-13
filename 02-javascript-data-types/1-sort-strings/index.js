/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    var sortedArray = typeof (arr)
    switch (param) {
        case 'asc':
            sortedArray = arr.slice().sort(sensitiveSorter);
            break;
        case 'desc':
            sortedArray = arr.slice().sort(sensitiveSorter).reverse();
            break;
        default:
            throw new Error("неверное значение параметра сортировки");
    }
    return sortedArray;
}

function sensitiveSorter(a, b) {

    if (a.toLowerCase() == b.toLowerCase()) {
        return a.charAt(0).toUpperCase() == a.charAt(0) ? -1 : 1;
    }

    return a.localeCompare(b);
}
