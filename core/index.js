import {
  skeletonPwa,
  Vent
} from './container';



const skeletonEngine = {};
window.skeletonPwa = skeletonPwa;
window.skeletonEngine = skeletonEngine;

skeletonPwa.factory('coreApi', function (container) {
  const deps = [];
  let addProvider = (app, name, providerFunc) => {
    let provider = new Promise((resolve, reject) => {
      app.provider(name, providerFunc);
      resolve();
    });
    deps.push(provider);
    return app;
  }

  let addService = (app, name, serviceFunc) => {
    let service = new Promise((resolve, reject) => {
      app.service(name, serviceFunc);
      resolve();
    });
    deps.push(service);
    return app;
  }
  let addFactory = (app, name, factoryFunc) => {
    let factory = new Promise((resolve, reject) => {
      app.factory(name, factoryFunc);
      resolve();
    });
    deps.push(factory);
    return app;
  }

  let addConstant = (app, name, constantFunc) => {
    let constant = new Promise((resolve, reject) => {

      app.constant(name, constantFunc);
      resolve();
    });
    deps.push(constant);
    return app;
  }

  let addValue = (app, name, valueFunc) => {
    let value = new Promise((resolve, reject) => {
      app.value(name, valueFunc);
      resolve();
    });
    deps.push(value);
    return app;
  }

  let addMiddleWare = (app, name, middlewareFunc) => {
     let middleware = new Promise((resolve, reject) => {
      app.value(name, middlewareFunc);
      resolve();
    });
    deps.push(middleware);
    return app;
  }
  
  let api = {};
  api.provider = addProvider.bind(null, skeletonPwa);
  api.service = addService.bind(null, skeletonPwa);
  api.factory = addFactory.bind(null, skeletonPwa);
  api.middleware = addMiddleWare.bind(null, skeletonPwa);
  api.value = addValue.bind(null, skeletonPwa);
  api.constant = addConstant.bind(null, skeletonPwa);
  api.resolveAll = () => {
     return Promise.all(deps);
  };
  return api;
});


const CoreApp = function AppService(skeletonpwa, skeletonconfig, $document, state, domApi, apiFactory, datastore, coreApi, singleSpa, singleSpaReact) {

  const _app = {};
  const viewContainer = skeletonconfig.viewContainer ? skeletonconfig.viewContainer : '.view-container';

  _app.utils = {};
  _app.core = skeletonpwa;
  _app.singleSpa = singleSpa;
  _app.singleSpaReact = singleSpaReact;
  _app.components = {};
  _app.config = () => _app.core.container.appCfg;
  _app.ngmodules = () => _app.core.container.ngmodules;
  _app.element = domApi(skeletonconfig.elements);
  _app.utils.api = apiFactory(skeletonconfig.api);
  _app.utils.viewContainer = $document.querySelector(viewContainer);
  _app.components.views = new Map();
  _app.vent = skeletonpwa.vent;
  _app.appRouter = state;//.initRouter(skeletonconfig.routes, skeletonconfig.routeConfig);
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
  console.log(coreApi);
  let coreapi = Object.assign({}, core, coreApi);
  return coreapi;
}
skeletonPwa.factory('uirouter', function(container) {
    return (state, config) => state.initRouter(config.routes, config.routeConfig);
});

skeletonPwa.factory('loadcfg', function(container) {
    return (cfg, http) => {
        let api = http(cfg.api);
        let cfgprop = api.get(cfg.publicConfig);
        const appCfg = {};
        appCfg.$name = 'appCfg';
        appCfg.$type = 'constant';
        const siteprefix = {};
        siteprefix.$name = 'siteprefix';
        siteprefix.$type = 'factory';
        const baseuri = () => cfg.prefixSite;
        const buildUri = function(container) {
          return (uri) => {
            let startToken = uri[0];
            
            if (baseuri() === startToken) {
              return uri;
            }
            return `${baseuri()}${uri}`;
           }
        }
        siteprefix.$value = buildUri;
        cfgprop.then((config) => {
          appCfg.$value = Object.assign({reload: () => cfgprop.then(d => d)}, cfg, config);
          container.$register(appCfg);
          container.$register(siteprefix);
        }).catch((err) => {
          appCfg.$value = Object.assign({reload: () => cfgprop.then(d => d)}, cfg);
          container.$register(appCfg);
          container.$register(siteprefix);
        });
    };
});


// datashopApp.shell('datashop').factory('siteprefix', buildUri);
skeletonPwa.factory('loadngModules', function(container) {
  return (cfg, http) => {
      let api = http(cfg.api);
      let cfgprop = api.get(cfg.angularModules);
      const appCfg = {};
      appCfg.$name = 'ngmodules';
      appCfg.$type = 'constant';
      cfgprop.then((list) => {
        appCfg.$value = Object.assign({reload: () => cfgprop.then(d => d)}, {modules: list});
        container.$register(appCfg);
      }).catch((err) => {
        appCfg.$value = Object.assign({reload: () => cfgprop.then(d => d)}, {modules: []});
        container.$register(appCfg);
      });
  };
});


skeletonEngine.bootstrap = function(name, config) {
  let skeletonApi = skeletonPwa.core.container.coreApi;

  if (config) {
    let skeletonConfig = config;
    skeletonApi.resolveAll()
    .then(() => {
      skeletonPwa.provider(name, function() {

        this.$get = function(container) {
          const $document = container.$document;
          const apiFactory = container.http;
          const domApi = container.$createElement;
          const $window = container.$window;
          const state = container.state;
          container.uirouter(state, skeletonConfig);
          container.loadcfg(skeletonConfig, apiFactory);
          container.loadngModules(skeletonConfig, apiFactory);
          const datastore = {};
          datastore.$name = 'datastore';
          datastore.$type = 'service';
          datastore.$value = Map;
          container.$register(datastore);
          return new CoreApp(skeletonPwa, skeletonConfig, $document, state, domApi, apiFactory, container.datastore, container.coreApi, container.singleSpa, container.singleSpaReact);
        }
      });
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
