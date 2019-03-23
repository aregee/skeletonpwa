export const appfactory = function(
  skeletonpwa,
  dom,
  state,
  datastore,
  coreApi,
  appCfg,
  vent,
  Utils
) {
  const _app = {};
  _app.utils = {};
  _app.core = skeletonpwa;
  _app.components = {};
  _app.module = moduleName => {
    if (_app.core.container.$list().indexOf(moduleName) > -1) {
      return _app.core.container[moduleName];
    } else {
      throw new Error(
        `${moduleName} not injected in the shell, please inject the dependency and try again`
      );
    }
  };
  _app.config = () => appCfg;
  _app.ngmodules = () => _app.core.container.ngmodules;
  _app.element = dom;
  _app.utils.api = Utils.api
  _app.utils.viewContainer = Utils.viewcontainer;
  _app.components.views = new Map();
  _app.vent = vent;
  _app.appRouter = state;
  _app.datastore = datastore;
  _app.utils.hooks = {};
  _app.utils.reduceParams = Utils.stringifyQueryParams;
  _app.utils.genUrl = Utils.pageurl;
  function run(cb) {
    coreApi.run(cb);
  }
  let core = {
    app: _app
  };
  core.run = run.bind(core);
  let coreapi = Object.assign({}, core, coreApi);

  return coreapi;
};
