import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';


export const supportRouterFactory = (ProgressiveEngine) => {
  class RouterService {
    constructor(routes=[], opts) {
      this.routes = routes;
      this.universalrouter = new UniversalRouter(routes, opts);
      this.url = (router) => (props) => generateUrls(router, props);
      this.genurl = this.url(this.universalrouter);
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
