


export const supportRouterFactory = (ProgressiveEngine) => {
  class RouterService {
    constructor(routes=[]) {
      this.routes = routes;
    }

    route(url) {
      let propHandle = (url, routes) => (resolve, reject) => {

        // first check all translators
        for (let i = 0; i < routes.length; i++) {
          let route = routes[i];
          if (route.test(url)) {
            resolve(route.component);
            return;
          }
        }


        reject({
          message: 'component not found',
          status: 404
        });
      };

      return new Promise(propHandle(url, this.routes));
    }


    patternToRegExp(pattern) {
      if (!Array.isArray(pattern)) {
        return this.patternToRegExp([pattern]);
      }
      return new RegExp([
        '^',
        pattern.map(function (p) {
          return p.replace('*', '[^/]+') + '$';
        }).join('|'),
        '$'
      ].join(''), 'i');
    }

    addRoute(route) {
      route.regex = this.patternToRegExp(route.pattern);
      route.test = (url) => {
        return route.regex.test(url.split('?')[0]);
      };
      this.routes.push(route);
      return this;
    }

  }

  const onInstance = (container, {
    resolve,
    reject
  }) => {

    container.service('state', RouterService);
    resolve(container);
  }
  ProgressiveEngine.onInstance(onInstance);
}
