/**
 * Set attributes on giving element
 * @param {object} attrs
 * @param {HTMLElement} el
 */
function setAttrs(attrs, el) {
  let uniqueId = Math.round(Math.random() * Date.now()).toString(20).substr(0, 4);
  Object.keys(attrs).forEach(key => el[key] = attrs[key]);
  el.setAttribute('uid', uniqueId);
}

/**
 * If the values is a string set it as text;
 * @param {string} val
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function ifStringSetText(val, el) {
  if (!!val && !!val.match) {
    el.innerHTML = val;
    return true;
  }

  return false;
}

/**
 * Create and element function for ease of use as api
 * @param {string} tagName
 * @returns {function}
 */
function createElement(tagName) {
  return (attrs, children) => {
    let el = document.createElement(tagName);
    attrs && setAttrs(attrs, el);
    if (children) {
      if (!!children.map) {
        children.forEach(child => {
          if (!ifStringSetText(child, el)) {
            el.appendChild(child);
          }
        });
      }

      ifStringSetText(children, el);
    }
    return el;
  };
}

export const rDom = function (elements) {
  let el = function (e) {
    return createElement(e);
  }
  let minimal = ['h1', 'div', 'span', 'article', 'a', 'nav', 'button'];

  let elist = Array.isArray(elements) ? minimal.concat(elements) : minimal;
  elist.forEach((d) => {
    el[d.toLowerCase()] = el.bind(null, d)();
  });
  return el;
}

const onInstance = (container, {
  resolve,
  reject
}) => {
  container.factory('$createElement', function(container) {
    return rDom;
  });
  container.factory('$window', function (container) {
    return window;
  });
  container.factory('$domq', function(container) {
    return (qs) => document.querySelector(qs);
  });
  container.factory('$document', function(container) {
    return document;
  });
  resolve(container);
}

export const supportDomApi = (ProgressiveEngine) => {
  ProgressiveEngine.onInstance(onInstance);
}
