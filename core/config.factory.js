export const configFactory = function({ $register, skeletonConfig, http }) {
  return prop => {
    let cfgprop;
    if (prop) {
      cfgprop = prop;
    } else {
      let api = new http({ apiBase: skeletonConfig.api });
      cfgprop = api.get(skeletonConfig.publicConfig);
    }
    const appCfg = {};
    let cfg = skeletonConfig;
    return cfgprop
      .then(config => {
        appCfg.$name = "instanceConfig";
        appCfg.$type = "constant";
        appCfg.$value = Object.assign(
          { reload: () => cfgprop.then(d => d) },
          cfg,
          config
        );
        return Promise.resolve($register(appCfg));
      })
      .catch(err => {
        appCfg.$name = "instanceConfig";
        appCfg.$type = "constant";
        appCfg.$value = Object.assign(
          { reload: () => cfgprop.then(d => d) },
          cfg
        );
        return Promise.resolve($register(appCfg));
      });
  };
};

configFactory.$name = "loadcfg";
configFactory.$type = "factory";
