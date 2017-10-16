import {
  skeletonPwa,
  Vent
} from './container';



const skeletonEngine = {};
window.skeletonPwa = skeletonPwa;
window.skeletonEngine = skeletonEngine;
const CoreApp = function AppService(skeletonpwa, skeletonconfig, $document, state, domApi, apiFactory) {

  const _app = {};
  const viewContainer = skeletonconfig.viewContainer ? skeletonconfig.viewContainer : '.view-container';

  _app.utils = {};
  _app.core = skeletonpwa;
  _app.components = {};
  _app.element = domApi(skeletonconfig.elements);
  _app.utils.api = apiFactory(skeletonconfig.api);
  _app.utils.viewContainer = $document.querySelector(viewContainer);
  _app.components.views = new Map();
  _app.vent = skeletonpwa.vent;
  _app.appRouter = state;
  _app.utils.hooks = {};

  function run(cb) {
    cb(this.app);
    this.app.vent.emit('engineLoaded', name, this);
  }
  let addProvider = (app, name, providerFunc) => {
    return app.provider(name, providerFunc);
  }

  let core = {
    app: _app
  };
  core.run = run.bind(core);
  core.provider = addProvider.bind(null, skeletonpwa);
  return core;
}

skeletonEngine.shell = function(name, config) {
  if (config) {
    let skeletonConfig = config;
    skeletonPwa.provider(name, function() {

      this.$get = function(container) {
        const $document = container.$document;
        const apiFactory = container.http;
        const domApi = container.$createElement;
        const $window = container.$window;
        const state = container.state;
        return new CoreApp(skeletonPwa, skeletonConfig, $document, state, domApi, apiFactory);
      }
    });
    return this;
  }
  return skeletonPwa.container[name];
}

skeletonEngine.bootstrap = function(name) {
  let inst = skeletonPwa.container[name];
  if (inst) {
    return inst;
  }
  throw new Error(`${name} not init`);
}

export {
  skeletonPwa,
  skeletonEngine,
  Vent
}
