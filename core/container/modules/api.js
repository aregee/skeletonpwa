const apiFactory = function(apiBase) {

  // wrap up request in a bluebird promise with some default
  // options to create the base api function
  var apibase = apiBase ? apiBase : window.location.origin;

  var api = function(method, url, options = {}) {
    // instantiate options as an empty object literal
    var header = url.indexOf('http') === 0 ? {} : {
      'Content-Type': 'application/json'
    };

    let uri = url.indexOf('http') === 0 ? url : apibase + url;
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
    return new Promise(function(resolve, reject) {
      fetch(uri, options)
        .then(res => {
          if (res.ok) {
            resolve(res.json());
          } else {
            var error = {}
            let msg = ({
              status,
              statusText,
              url
            }) => {
              return {
                status,
                statusText,
                url
              };
            };
            Object.assign(error, msg(res));
            error.traceback = res;
            error.message = res.json();
            reject(error);
          }
        })
        .catch((err) => {
          // console.log(err);
          var error = new Error(err.toString())
          error.response = err;
          reject(error);
        });
    });
  }
  // attach shorthands for get, put, post, delete to api
  let methods = ['GET', 'PUT', 'POST', 'DELETE'];
  methods.forEach(function(m) {
    api[m.toLowerCase()] = function(url, options) {
      return api(m, url, options);
    };
  });
  return api;
}

const onInstance = (container, {
  resolve,
  reject
}) => {
  container.service('http', function() {
    return apiFactory;
  });
  resolve(container);
}

export const supportApi = (ProgressiveEngine) => {
  ProgressiveEngine.onInstance(onInstance);
}
