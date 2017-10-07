const apiFactory = function (apiBase) {

  // wrap up request in a bluebird promise with some default
  // options to create the base api function


  var api = function (method, url, options = {}) {
    // instantiate options as an empty object literal
    var header = url.indexOf('http') === 0 ? {} : {
      'Content-Type': 'application/json'
    };

    let uri = url.indexOf('http') === 0 ? url : apiBase + url;
    Object.assign(
      options, {

        // set the http request method
        method: method,
        credentials: 'same-origin',
        // if the url starts with 'http', leave it be, otherwise
        // prefix api_base to the url
        // if the url starts with http, leave headers be
        headers: options.headers ? options.headers : header
      }
    );

    return fetch(uri, options).then(res => res.json()).catch((err) => {
      // console.log(err);
      var error = new Error(err.toString())
      error.response = err;
      return Promise.reject(error);
    });
  };

  // attach shorthands for get, put, post, delete to api
  ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (m) {
    api[m.toLowerCase()] = function (url, options) {
      return api(m, url, options);
    };
  });

  return api;
}


const onInstance = (container, {
  resolve,
  reject
}) => {
  container.register('apiFactory', apiFactory);
  resolve(container);
}

export const supportApi = (ProgressiveEngine) => {
  ProgressiveEngine.onInstance(onInstance);
}
