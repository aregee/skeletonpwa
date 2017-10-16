import {
  ProgressiveEngine
} from './Engine';

import {
  supportDomApi,
  supportApi,
  supportRouterFactory,
  supportComponents,
  Vent
} from './modules';


ProgressiveEngine.instanceWaiters = [];


ProgressiveEngine.prototype.status = function () {
  return {
    active: this.active,
    name: this.name
  };
};

ProgressiveEngine.onInstance = function (func) {
  ProgressiveEngine.instanceWaiters.push(func);
};


const supportVent = (Engine) => {
  const onInstance = (container, {
    resolve,
    reject
  }) => {
    container.service('$vent', Vent);
    Engine.prototype.active = true;
    resolve(container);
  }
  Engine.onInstance(onInstance);
}

supportDomApi(ProgressiveEngine);
supportRouterFactory(ProgressiveEngine);
supportApi(ProgressiveEngine);
supportComponents(ProgressiveEngine);
supportVent(ProgressiveEngine);

const skeletonPwa = new ProgressiveEngine();

export {
  skeletonPwa,
  Vent
}
