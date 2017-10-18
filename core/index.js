import {
  skeletonPwa,
  Vent
} from './container';



const skeletonEngine = {};
window.skeletonPwa = skeletonPwa;
window.skeletonEngine = skeletonEngine;

skeletonPwa.factory('coreApi', function (container) {
  let addProvider = (app, name, providerFunc) => {
    return app.provider(name, providerFunc);
  }

  let addService = (app, name, providerFunc) => {
    return app.provider(name, providerFunc);
  }
  let addFactory = (app, name, factoryFunc) => {
    return app.factory(name, factoryFunc);
  }
  let addConstant = (app, name, constantFunc) => {
    return app.constant(name, constantFunc);
  }
  let addValue = (app, name, valueFunc) => {
    return app.value(name, valueFunc);
  }

  let addMiddleWare = (app, name, middlewareFunc) => {
    return app.middleware(name, middlewareFunc);
  }
  let api = {};
  api.provider = addProvider.bind(null, skeletonPwa);
  api.service = addService.bind(null, skeletonPwa);
  api.factory = addFactory.bind(null, skeletonPwa);
  api.middleware = addMiddleWare.bind(null, skeletonPwa);
  api.value = addValue.bind(null, skeletonPwa);
  api.constant = addConstant.bind(null, skeletonPwa);
  return api;
});


const CoreApp = function AppService(skeletonpwa, skeletonconfig, $document, state, domApi, apiFactory, datastore, coreApi) {

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
  _app.datastore = datastore;
  _app.utils.hooks = {};
  let forPage = (ack) => {
    let init = () => 'partials[]=';
    let accu = ack ? ack : '';
    return {
      tpl: init,
      val: accu
    };
  }

  let urlParams = (params = []) => (scope) => {
    return params.reduce((all, t) => {
      //     console.log(all.tpl())
      if (all.val === '') {
        all.val = all.val + all.tpl() + t;
        return all;
      } else {
        all.val = `${all.val}&${all.tpl()}${t}`;
        return all;
      }
    }, scope);
  }

  let uri = ({
    val
  }) => val;
  let genUrl = (base, params = []) => uri(urlParams(params)(forPage(base)));
  _app.utils.genUrl = genUrl;

  let baseReduce = (o) => {
    let ocom = Object.keys(o).reduce(function(out, key) {
      out.push({
        key: key,
        val: o[key]
      });
      return out;
    }, []); // [{key: 'a', value: 1}, {key: 'b', value: 2}, {key: 'c', value: 3}]
    return ocom;
  }

  let reduceParams = (base) => (params) => {
    //  @parms({args: temp1[1], url: 'foo' })
    return params.url + base(params.args).reduce(function(res, obj) {
      if (obj.val === null || obj.key === '') {
        return res;
      }
      return res + '?' + '&' + obj.key + '=' + obj.val;
    }, '');
  };

  _app.utils.reduceParams = reduceParams(baseReduce);

  function run(cb) {
    cb(this.app);
    this.app.vent.emit('engineLoaded', name, this.app);
  }

  let core = {
    app: _app
  };
  core.run = run.bind(core);
  let coreapi = Object.assign({}, core, coreapi);
  return coreapi;
}

skeletonEngine.bootstrap = function(name, config) {
  if (config) {
    let skeletonConfig = config;
    skeletonPwa.provider(name, function() {

      this.$get = function(container) {
        const $document = container.$document;
        const apiFactory = container.http;
        const domApi = container.$createElement;
        const $window = container.$window;
        const state = container.state;
        const datastore = {};
        datastore.$name = 'datastore';
        datastore.$type = 'service';
        datastore.$value = Map;
        container.$register(datastore);
        return new CoreApp(skeletonPwa, skeletonConfig, $document, state, domApi, apiFactory, container.datastore, container.coreApi);
      }
    });
    return this;
  }
  return skeletonPwa.container[name];
}

skeletonEngine.shell = function(name) {
  let inst = skeletonPwa.container[name];
  if (inst) {
    return inst;
  }
  let api = skeletonPwa.container.coreApi;
  return api;
  // throw new Error(`${name} not init`);
}

export {
  skeletonPwa,
  skeletonEngine,
  Vent
}
