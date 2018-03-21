import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';


export const supportRouterFactory = (ProgressiveEngine) => {
  class RouterService {
    constructor() {
      this.routes = [];
      this.opts = {};
      this.universalrouter = null;
      this.url = (router) => (props) => generateUrls(router, props);
      this.genurl = null;
    }

    initRouter(routes=[], opts={}) {
      this.routes = routes;
      this.opts = opts;
      this.universalrouter = new UniversalRouter(this.routes, this.opts);
      this.genurl = this.url(this.universalrouter);
      return this;
    }

    route(url) {
      return this.universalrouter.resolve(url);
    }

    genUrl(state, props, routerprops) {
      return this.genurl(routerprops)(state, props);
    }

    addRoute(route) {
      this.universalrouter.root.children.push(route);
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
