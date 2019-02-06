import { skeletonPwa } from "./container";

export const coreApiFactory = function(container) {
  let destroy = name => {
    return new Promise((resolve, reject) => {
      if (skeletonPwa.container[name]) {
        delete skeletonPwa.container[name];
        resolve();
      }
      reject("Shell not bootstraped yet");
    });
  };

  let api = {};
  api.defineConfig = skeletonPwa.configure;
  api.destroy = destroy;
  api.run = skeletonPwa.addRuntime;
  
  return Object.assign(skeletonPwa, api);;
};

coreApiFactory.$name = "coreApi";
coreApiFactory.$type = "factory";
