import {
  ProgressiveEngine
} from './Engine';

import {
  supportDomApi,
  supportApi,
  supportComponents,
  singleSpaMithril,
  singleSpaAngular1,
  Vent,
  mix
} from './modules';

import * as singleSpa from 'single-spa';
import singleSpaReact from 'single-spa-react';


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
    container.service('$vent', function () {
      return Vent;
    });
    container.service('mix', function () {
      return mix;
    });
    Engine.prototype.active = true;
    resolve(container);
  }
  Engine.onInstance(onInstance);
}

const supportSingleSpas = (Engine) => {
  const onInstance = (container, {
    resolve,
    reject
  }) => {
    container.service('singleSpa', function () {
      return singleSpa;
    });
    container.service('singleSpaReact', function () {
      return singleSpaReact;
    });
    container.service('singleSpaAngular', function () {
      return singleSpaAngular1;
    });
    container.service('singleSpaMithril', function () {
      return singleSpaMithril;
    });
  }
  Engine.onInstance(onInstance);
};

supportDomApi(ProgressiveEngine);
supportApi(ProgressiveEngine);
supportComponents(ProgressiveEngine);
supportVent(ProgressiveEngine);
supportSingleSpas(ProgressiveEngine);

const skeletonPwa = new ProgressiveEngine('skeleton');

export {
  skeletonPwa,
  Vent
}
