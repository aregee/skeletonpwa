import UniversalRouter from "universal-router";
import generateUrls from "universal-router/generateUrls";

export class RouterService {
  constructor(config) {
    this.routes = config.routes ? config.routes : [];
    this.url = router => props => generateUrls(router, props);
    this.opts = config.routeConfig;
    this.universalrouter = new UniversalRouter(this.routes, this.opts);
    this.genurl = this.url(this.universalrouter);
    return this;
  }

  route(url, context = {}) {
    return this.universalrouter.resolve({ pathname: url, ...context });
  }

  genUrl(state, props, routerprops) {
    return this.genurl(routerprops)(state, props);
  }

  addRoute(route) {
    this.universalrouter.root.children.push(route);
    return this;
  }
}

RouterService.$name = 'state';
RouterService.$inject = ['skeletonConfig'];