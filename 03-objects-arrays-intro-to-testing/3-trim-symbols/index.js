/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  
  if (size === undefined) {
    return string;
  }

  if (size === 0) {
    return '';
  }

  let prevChar = string.charAt(0);
  let matches = 1;
  let result = prevChar;

  for (let i = 1; i < string.length; i++) {
    if (prevChar == string.charAt(i)) {      
      matches++;
      if (matches <= size) {
        result += string.charAt(i);
      }
    } else {
      matches = 1;
      result += string.charAt(i);
    }
    prevChar = string.charAt(i);
  }
  
  return result;
}
