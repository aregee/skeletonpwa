import {
  skeletonPwa,
  Vent
} from './container';



const skeletonEngine = {};
window.skeletonPwa = skeletonPwa;
window.skeletonEngine = skeletonEngine;

skeletonPwa.factory('coreApi', function (container) {
  const deps = [];
  const runtimes = [];
  const instanceWaiters = [];
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

  let destroy = name => {
    return new Promise((resolve, rejct) => {
      if (skeletonPwa.container[name]) {
        delete skeletonPwa.container[name];
        resolve();
      }
      rejct('Shell not bootstraped yet');
    });
  };
  let addRuntime = cb => {
    runtimes.push(cb);
  };
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
  api.destroy = destroy;
  api.run = addRuntime;
  api.runAll = (app) => {
    let runtimed = (instance) => runtime => {
      return new Promise(function (resolve, reject) {
        console.log(instance);
        console.log(runtime);
        resolve(runtime(instance.app));
      });
    };
    let runtimeProp = runtimed(app);
    let times = runtimes.reduce((all, runtime) => {
      all.push(runtimeProp(runtime));
      return all;
    }, []);
    // instanceWaiters.push(runtime(app));

    return Promise.all(times)
    .then(d => {
      console.log(d);
      return Promise.resolve(app);
    });
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
  _app.module = (moduleName) => {
    if(_app.core.container.$list().indexOf(moduleName) > -1 ) {
      return _app.core.container[moduleName];
    } else {
      throw new Error(`${moduleName} not injected in the shell, please inject the dependency and try again`);
    }
  };
  _app.config = () => _app.core.container.appCfg;
  _app.ngmodules = () => _app.core.container.ngmodules;
  _app.element = domApi(skeletonconfig.elements);
  _app.utils.api = new apiFactory({apiBase: skeletonconfig.api});
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
    coreApi.run(cb);
  }
  let core = {
    app: _app
  };
  core.run = run.bind(core);
  console.log(coreApi);
  let coreapi = Object.assign({}, core, coreApi);
  // _app.vent.on('engineLoaded', () => {
  //   coreApi.runAll(core.app);
  // });
  
  
  return coreapi;
}

skeletonPwa.factory('uirouter', function(container) {
    return (state, config) => state.initRouter(config.routes, config.routeConfig);
});

skeletonPwa.factory('loadcfg', function(container) {
    return (cfg, http) => {
        let api = new http({apiBase: cfg.api });
        let cfgprop = api.get(cfg.publicConfig);
        const appCfg = {};
        appCfg.$name = 'appCfg';
        appCfg.$type = 'constant';
        return cfgprop.then((config) => {
          appCfg.$value = Object.assign({reload: () => cfgprop.then(d => d)}, cfg, config);
          return Promise.resolve(skeletonPwa.constant('appCfg', appCfg.$value));
        }).catch((err) => {
          appCfg.$value = Object.assign({reload: () => cfgprop.then(d => d)}, cfg);
          return Promise.resolve(skeletonPwa.constant('appCfg', appCfg.$value));
        });
    };
});


skeletonPwa.service('datastore', Map);
skeletonPwa.factory('loadngModules', function(container) {
  return (cfg, http) => {
      let api = new http({apiBase: cfg.api});
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
  let skeletonApi = skeletonPwa.container.coreApi;
  if (config) {
    let skeletonConfig = config;
    const baseuri = () => skeletonConfig.prefixSite;
    const buildUri = function(container) {
      return (uri) => {
        let startToken = uri[0];
        
        if (baseuri() === startToken) {
          return uri;
        }
        return `${baseuri()}${uri}`;
       }
    };
    skeletonPwa.factory('siteprefix', buildUri);
    skeletonPwa.container.loadngModules(skeletonConfig, skeletonPwa.container.http);
    return skeletonPwa.container.loadcfg(skeletonConfig, skeletonPwa.container.http)
    .then((shell) => {
      return skeletonApi.resolveAll();
    })
    .then(() => {
      skeletonPwa.provider(name, function() {
        this.$get = function(container) {
          const $document = container.$document;
          const apiFactory = container.http;
          const domApi = container.$createElement;
          const $window = container.$window;
          const state = container.state;
          container.uirouter(state, skeletonConfig);
          return new CoreApp(skeletonPwa, skeletonConfig, $document, state, domApi, apiFactory, container.datastore, container.coreApi, container.singleSpa, container.singleSpaReact);
        }
      });
      // skeletonPwa.container.$window[name] = skeletonPwa.container[name];
      return skeletonApi.runAll(skeletonPwa.container[name]);
    });
    // return this;
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
