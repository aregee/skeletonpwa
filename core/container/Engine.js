import { LazyIoc } from "lazyioc";
import { Vent } from "./modules";

const slice = Array.prototype.slice;

export class ProgressiveEngine extends LazyIoc {
  constructor(name) {
    super(name);
    if (this.active) {
      return;
    }
    ProgressiveEngine.Singleton = this;
    this.options = {
      $this: "skeleton"
    };
    this.vent = new Vent();
    this.deps = [];
    this.runtimes = [];
    this.digestRuntimes = [];
    this.instanceWaiterProps = [];
    while (ProgressiveEngine.instanceWaiters.length) {
      let instanceWaiters = instance => {
        return new Promise(function(resolve, reject) {
          ProgressiveEngine.instanceWaiters.shift()(instance, {
            resolve,
            reject
          });
        });
      };
      this.instanceWaiterProps.push(instanceWaiters(this));
    }
  }
  resolveAll() {
    return Promise.all(this.deps);
  }

  component(name, Component, injects = []) {
    const $this = this;
    Component.$name = name;
    Component.$inject = Array.isArray(Component.$inject)
      ? Component.$inject
      : [].concat(injects);
    $this.register(Component);
    return this;
  }

  componentFactory(name, serviceFactory, injects = []) {
    const $this = this;
    let args = arguments.length > 3 ? slice.call(arguments, 3) : injects;
    serviceFactory.$name = name;
    serviceFactory.$type = "serviceFactory";
    serviceFactory.$inject = Array.isArray(serviceFactory.$inject)
      ? serviceFactory.$inject
      : [].concat(args);
    $this.register(serviceFactory);
    return this;
  }

  configure(serviceFactory, injects = []) {
    const $this = this;
    serviceFactory.$name = serviceFactory.$name
      ? serviceFactory.$name
      : $this.id();
    serviceFactory.$type = "service";
    serviceFactory.$inject = Array.isArray(serviceFactory.$inject)
      ? serviceFactory.$inject
      : [].concat(injects);
    let service = new Promise((resolve, reject) => {
      $this.register(serviceFactory);
      resolve();
    });
    $this.deps.push(service);
    const { $name } = serviceFactory;
    $this.digestRuntimes.push($name);
    return this;
  }

  addRuntime(cb) {
    this.runtimes.push(cb);
    return this;
  }

  runAll(app) {
    const $app = app;
    const $this = this;
    let runtimed = instance => runtime => {
      return new Promise(function(resolve, reject) {
        resolve(runtime(instance.app));
      });
    };
    let runtimeProp = runtimed($app);

    let times = $this.runtimes.reduce((all, runtime) => {
      all.push(runtimeProp(runtime));
      return all;
    }, []);

    return Promise.all(times)
      .then(() => {
        let runtimes = () => $this.digest($this.digestRuntimes);
        let appLoadCb = () => {
          let results = runtimes();
          $app._runBlocks = results;
          return $app;
        };
        return Promise.resolve(appLoadCb);
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }
}
