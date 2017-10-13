import {
  skeletonPwa,
  Vent
} from './container';



const skeletonEngine = {};

skeletonEngine.shell = function (name, config) {
  if (config) {
    skeletonPwa.provider(name, function(config) {
      let skeletonConfig = config;
      this.$get =  function (container) {
          const $document = container.$document;
          const apiFactory = container.apiFactory;
          const domApi = container.$createElement;
          const $window = container.$window;
          const _app = {};
          const viewContainer = config.viewContainer ? config.viewContainer : '.view-container';

          _app.utils = {};
          _app.container = skeletonPwa;
          _app.components = {};
          _app.element = domApi(skeletonConfig.elements);
          _app.utils.api = apiFactory(skeletonConfig.api);
          _app.utils.viewContainer = $document.querySelector(viewContainer);
          _app.components.views =  new Map();
          _app.vent = skeletonPwa.vent;
          _app.appRouter = skeletonPwa.container.appRouter;
          _app.utils.hooks =  {};
          function run(cb) {

            cb(this.app);
            this.app.vent.emit('engineLoaded', name, core);
          }

          let core = {
            app: _app
          };
          core.run = run.bind(core);
          return core;
      }
  });
    return skeletonPwa.container[name];
  } else {
    return skeletonPwa.container[name];
  }

}

export {
  skeletonPwa,
  skeletonEngine,
  Vent
}
