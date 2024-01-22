/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {

  const props = path.split('.');

  function getter(obj) {
    if (Object.entries(obj).length === 0) {
      return;
    }

    for (const key of props) {
      obj = obj[key];
    }
    return obj;
  }
  return getter;
} 
