import {
  skeletonPwa,
  Vent
} from './container';



const skeletonEngine = skeletonPwa;

skeletonEngine.shell = (name, config) => {
  // console.log(skeletonPwa);

  if (config) {
    skeletonPwa.factory(name, function (container) {
      const $document = container.$document;
      const apiFactory = container.apiFactory;
      const domApi = container.$createElement;
      const $window = container.$window;
      const _app = {};
      const viewContainer = config.viewContainer ? config.viewContainer : '.view-container';

      _app.utils = {};
      _app.container = skeletonEngine;
      _app.components = {};
      _app.element = domApi(config.elements);
      _app.utils.api = apiFactory(config.api);
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

      skeletonPwa.factory([name], function() {
        return core;
      });

      $window[name] = skeletonPwa.container[name];
    });
    return skeletonPwa.container[name];
  } else {
    return skeletonPwa.container[name];
  }
    // $window[name] = appInstance
}

export {
  skeletonEngine,
  Vent
}
