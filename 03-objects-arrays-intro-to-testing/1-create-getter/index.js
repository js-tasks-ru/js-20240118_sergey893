/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {

  let props = path.split('.');

  function getter(obj) {
    if (obj === undefined) {
      return undefined;
    }

    let key = props.shift();
    if (props.length === 0) {
      return obj[key];
    }
    return getter(obj[key]);
  }

  return getter;
}
