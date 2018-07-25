import { skeletonPwa, Vent } from "./container";
import { coreApiFactory } from "./api";
import { appfactory } from "./app.factory";
import { configFactory } from "./config.factory";
import { RouterService } from "./Router";
import { Dom } from "./Dom";
import { apiFactory } from "./apiFactory";
import { buildUri } from "./buildUri";
import * as singleSpa from "single-spa";
import singleSpaReact from "single-spa-react";

import {
  apiUtils,
  viewContainerUtils,
  stringifyQueryUtils,
  pageurlUtils
} from "./app.utils";

const skeletonEngine = {};
window.skeletonPwa = skeletonPwa;
window.skeletonEngine = skeletonEngine;

skeletonPwa.register(Dom);

skeletonPwa.register(RouterService);

// skeletonPwa.register(Utils);

skeletonPwa.register(apiUtils);

skeletonPwa.register(viewContainerUtils);

skeletonPwa.register(pageurlUtils);

skeletonPwa.register(stringifyQueryUtils);

skeletonPwa.register(apiFactory);

skeletonPwa.register(buildUri);

skeletonPwa.register(coreApiFactory);

skeletonPwa.register(configFactory);

skeletonPwa.factory("singleSpa", function() {
  return singleSpa;
});

skeletonPwa.factory("singleSpaReact", function() {
  return singleSpaReact;
});

skeletonPwa.service("datastore", Map);

skeletonPwa.factory("skeletonpwa", function() {
  return skeletonPwa;
});

skeletonEngine.bootstrap = function(name, config, dependencies = []) {
  let skeletonApi = skeletonPwa.container.coreApi;
  if (config) {
    let skeletonConfig = config;
    skeletonPwa.constant("skeletonConfig", skeletonConfig);
    // skeletonPwa.container.uirouter;
    return skeletonPwa.container
      .loadcfg()
      .then(shell => {
        return skeletonApi.resolveAll();
      })
      .then(() => {
        let deps = [
          "skeletonpwa",
          "dom",
          "state",
          "datastore",
          "coreApi",
          "appCfg",
          "vent",
          "Utils"
        ].concat(dependencies);
        appfactory.$name = name;
        appfactory.$type = "serviceFactory";
        appfactory.$inject = deps;
        skeletonPwa.register(appfactory);
        return skeletonApi.runAll(skeletonPwa.container[name]);
      });
  }
  return skeletonPwa.container[name];
};

skeletonEngine.shell = function(name) {
  let inst = skeletonPwa.container[name];
  if (inst) {
    return inst;
  }
  let api = skeletonPwa.container.coreApi;
  return api;
  // throw new Error(`${name} not init`);
};

export { skeletonPwa, skeletonEngine, Vent };
