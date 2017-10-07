import {
  skeletonPwa,
  Vent
} from './container';

const $document = skeletonPwa.get('$document');
const apiFactory = skeletonPwa.get('apiFactory');
const domApi = skeletonPwa.get('$createElement');
const $window = skeletonPwa.get('$window');
const skeletonEngine = skeletonPwa;

skeletonEngine.shell = (name, config) => {
  // console.log(skeletonPwa);
  var appInstance = skeletonPwa.isBound(name) ? skeletonPwa.get(name) : {};
  $window[name] = appInstance;
  if (config) {
    const _app = appInstance;
    let viewContainer = config.viewContainer ? config.viewContainer : '.view-container';
    _app.utils = appInstance.utils ? appInstance.utils : {};
    _app.container = skeletonEngine;
    _app.components = appInstance.components ? appInstance.components : {};
    _app.element = appInstance.element ? appInstance.element : domApi(config.elements);
    _app.utils.api = appInstance.utils.api ? appInstance.utils.api : apiFactory(config.api);
    _app.utils.viewContainer = $document.querySelector(viewContainer);
    _app.components.views = appInstance.components.views ? appInstance.components.views : new Map();
    _app.vent = skeletonPwa.vent;
    _app.appRouter = skeletonPwa.get('appRouter');
    _app.utils.hooks = appInstance.utils.hooks ? appInstance.utils.hooks : {};

    function run(cb) {

      cb(this.app);
      this.app.vent.emit('engineLoaded', name, core);
    }

    let core = {
      app: _app
    };

    skeletonPwa.register([name], core);
    core.run = run.bind(core);
    return skeletonPwa.get(name);
  }

  return appInstance;



}

export {
  skeletonEngine,
  Vent
}
