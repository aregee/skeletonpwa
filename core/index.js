import { skeletonPwa, Vent } from "./container";
import { coreApiFactory } from "./api";
import { appfactory } from './app.factory';
import { configFactory } from "./config.factory";
import { RouterService } from "./Router";
import { Dom } from "./Dom";
import { apiFactory } from "./apiFactory";
import { buildUri } from "./buildUri";

const skeletonEngine = {};
window.skeletonPwa = skeletonPwa;
window.skeletonEngine = skeletonEngine;


skeletonPwa.register(Dom);

skeletonPwa.register(RouterService);

skeletonPwa.register(apiFactory);

skeletonPwa.register(buildUri);

skeletonPwa.register(coreApiFactory);

skeletonPwa.register(configFactory);

skeletonPwa.service("datastore", Map);

skeletonPwa.factory("skeletonpwa", function() {
  return skeletonPwa;
});

skeletonEngine.bootstrap = function(name, config) {
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
        skeletonPwa.serviceFactory(
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
        );
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