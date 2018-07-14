import { skeletonPwa } from "./container";
import { appfactory } from "./app.factory";

export const coreApiFactory = function(container) {
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
  };
  let addPackage = function(app, name, injects = []) {
    let addpackage = () =>
      new Promise((resolve, reject) => {
        app.serviceFactory.apply(
          app,
          [
            name,
            appfactory,
            "skeletonpwa",
            "skeletonConfig",
            "$document",
            "api",
            "dom",
            "$window",
            "state",
            "datastore",
            "coreApi",
            "singleSpa",
            "singleSpaReact",
            "appCfg",
            "vent"
          ].concat(injects)
        );
        resolve();
      });
    deps.push(addpackage());
    return app;
  };
  let addComponent = (app, name, Component, injects = []) => {
    let componentView = new Promise((resolve, reject) => {
      Component.$name = name;
      Component.$inject = Array.isArray(Component.$inject)
        ? Component.$inject
        : [].concat(injects);
      app.register(Component);
      resolve();
    });
    deps.push(componentView);
    return app;
  };
  let addService = (app, name, serviceFunc) => {
    let args = arguments.length > 3 ? slice.call(arguments, 3) : null;
    let service = new Promise((resolve, reject) => {
      app.service.apply(app, [name, serviceFunc].concat(args));
      resolve();
    });
    deps.push(service);
    return app;
  };
  let addServiceFactory = (app, name, serviceFactory, injects = []) => {
    let args = arguments.length > 4 ? slice.call(arguments, 4) : injects;
    serviceFactory.$name = name;
    serviceFactory.$type = 'serviceFactory';
    serviceFactory.$inject = Array.isArray(serviceFactory.$inject)
      ? serviceFactory.$inject
      : [].concat(injects);
    let service = new Promise((resolve, reject) => {
        app.register(serviceFactory);
      resolve();
    });
    deps.push(service);
    return app;
  };

  let addFactory = (app, name, factoryFunc) => {
    let factory = new Promise((resolve, reject) => {
      app.factory(name, factoryFunc);
      resolve();
    });
    deps.push(factory);
    return app;
  };

  let addConstant = (app, name, constantFunc) => {
    let constant = new Promise((resolve, reject) => {
      app.constant(name, constantFunc);
      resolve();
    });
    deps.push(constant);
    return app;
  };

  let addValue = (app, name, valueFunc) => {
    let value = new Promise((resolve, reject) => {
      app.value(name, valueFunc);
      resolve();
    });
    deps.push(value);
    return app;
  };

  let addMiddleWare = (app, name, middlewareFunc) => {
    let middleware = new Promise((resolve, reject) => {
      app.value(name, middlewareFunc);
      resolve();
    });
    deps.push(middleware);
    return app;
  };

  let destroy = name => {
    return new Promise((resolve, rejct) => {
      if (skeletonPwa.container[name]) {
        delete skeletonPwa.container[name];
        resolve();
      }
      rejct("Shell not bootstraped yet");
    });
  };
  let addRuntime = cb => {
    runtimes.push(cb);
  };
  skeletonPwa.component = addComponent.bind(null, skeletonPwa);
  skeletonPwa.componentFactory = addServiceFactory.bind(null, skeletonPwa);
  skeletonPwa.package = addPackage.bind(null, skeletonPwa);
  let api = {};
  api.provider = addProvider.bind(null, skeletonPwa);
  api.service = addService.bind(null, skeletonPwa);
  api.factory = addFactory.bind(null, skeletonPwa);
  api.middleware = addMiddleWare.bind(null, skeletonPwa);
  api.value = addValue.bind(null, skeletonPwa);
  api.constant = addConstant.bind(null, skeletonPwa);
  api.serviceFactory = addServiceFactory.bind(null, skeletonPwa);
  api.package = addPackage.bind(null, skeletonPwa);
  api.componentFactory = addServiceFactory.bind(null, skeletonPwa);
  api.component = addComponent.bind(null, skeletonPwa);
  api.resolveAll = () => {
    return Promise.all(deps);
  };
  api.destroy = destroy;
  api.run = addRuntime;
  api.runAll = app => {
    let runtimed = instance => runtime => {
      return new Promise(function(resolve, reject) {
        resolve(runtime(instance.app));
      });
    };
    let runtimeProp = runtimed(app);
    let times = runtimes.reduce((all, runtime) => {
      all.push(runtimeProp(runtime));
      return all;
    }, []);

    return Promise.all(times).then(d => {
      return Promise.resolve(app);
    });
  };
  return api;
};

coreApiFactory.$name = "coreApi";
coreApiFactory.$type = "factory";
