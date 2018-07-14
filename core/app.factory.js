export const appfactory = function(
  skeletonpwa,
  skeletonConfig,
  $document,
  api,
  dom,
  $window,
  state,
  datastore,
  coreApi,
  singleSpa,
  singleSpaReact,
  appCfg,
  vent
) {
  const _app = {};
  const viewContainer = skeletonConfig.viewContainer
    ? skeletonConfig.viewContainer
    : ".view-container";

  _app.utils = {};
  _app.core = skeletonpwa;
  _app.singleSpa = singleSpa;
  _app.singleSpaReact = singleSpaReact;
  _app.components = {};
  _app.module = moduleName => {
    if (_app.core.container.$list().indexOf(moduleName) > -1) {
      return _app.core.container[moduleName];
    } else {
      throw new Error(
        `${moduleName} not injected in the shell, please inject the dependency and try again`
      );
    }
  };
  _app.config = () => appCfg;
  _app.ngmodules = () => _app.core.container.ngmodules;
  _app.element = dom;
  _app.utils.api = api;
  _app.utils.viewContainer = $document.querySelector(viewContainer);
  _app.components.views = new Map();
  _app.vent = vent;
  _app.appRouter = state; //.initRouter(skeletonconfig.routes, skeletonconfig.routeConfig);
  _app.datastore = datastore;
  _app.utils.hooks = {};
  let forPage = ack => {
    let init = () => "partials[]=";
    let accu = ack ? ack : "";
    return {
      tpl: init,
      val: accu
    };
  };

  let urlParams = (params = []) => scope => {
    return params.reduce((all, t) => {
      if (all.val === "") {
        all.val = all.val + all.tpl() + t;
        return all;
      } else {
        all.val = `${all.val}&${all.tpl()}${t}`;
        return all;
      }
    }, scope);
  };

  let uri = ({ val }) => val;
  let genUrl = (base, params = []) => uri(urlParams(params)(forPage(base)));
  _app.utils.genUrl = genUrl;

  let baseReduce = o => {
    let ocom = Object.keys(o).reduce(function(out, key) {
      out.push({
        key: key,
        val: o[key]
      });
      return out;
    }, []); // [{key: 'a', value: 1}, {key: 'b', value: 2}, {key: 'c', value: 3}]
    return ocom;
  };

  let queryProp = {
    stringifyQueryParams(params) {
      return Object.keys(params)
        .reduce((all, key) => {
          if (key === "") {
            return all;
          }
          if (params[key] !== null && params[key] !== "") {
            all.push(`${key}=${params[key]}`);
          }
          return all;
        }, [])
        .join("&");
    }
  };

  let reduceParams = ({ stringifyQueryParams }) => ({ url, args }) => {
    //  @parms({args: temp1[1], url: 'foo' })
    return stringifyQueryParams(args) !== ""
      ? `${url}?${stringifyQueryParams(args)}`
      : url;
  };
  _app.utils.reduceParams = reduceParams(queryProp);

  function run(cb) {
    coreApi.run(cb);
  }
  let core = {
    app: _app
  };
  core.run = run.bind(core);
  let coreapi = Object.assign({}, core, coreApi);

  return coreapi;
};
