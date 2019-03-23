import { ProgressiveEngine } from "./Engine";

import { supportDomApi, supportApi, Vent, mix } from "./modules";

ProgressiveEngine.instanceWaiters = [];

ProgressiveEngine.prototype.status = function() {
  return {
    active: this.active,
    name: this.name
  };
};

ProgressiveEngine.onInstance = function(func) {
  ProgressiveEngine.instanceWaiters.push(func);
};

const supportVent = Engine => {
  const onInstance = (container, { resolve, reject }) => {
    container.service("$vent", Vent);
    container.service("mix", function() {
      return mix;
    });
    Engine.prototype.active = true;
    resolve(container);
  };
  Engine.onInstance(onInstance);
};

supportDomApi(ProgressiveEngine);
supportApi(ProgressiveEngine);
supportVent(ProgressiveEngine);

const skeletonPwa = new ProgressiveEngine("skeleton");

export { skeletonPwa, Vent };
