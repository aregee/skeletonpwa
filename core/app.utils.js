
export const apiUtils = function(api) {
  return api;
};
apiUtils.$inject = ["api"];
apiUtils.$name = "Utils.api";
apiUtils.$type = "serviceFactory";

export const pageurlUtils = function() {
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
  return (base, params = []) => uri(urlParams(params)(forPage(base)));
};
pageurlUtils.$name = "Utils.pageurl";
pageurlUtils.$type = "serviceFactory";
pageurlUtils.$inject = [];

export const viewContainerUtils = function(skeletonConfig, $document) {
  const viewContainer = skeletonConfig.viewContainer
    ? skeletonConfig.viewContainer
    : ".view-container";
  return $document.querySelector(viewContainer);
};
viewContainerUtils.$name = "Utils.viewcontainer";
viewContainerUtils.$type = "serviceFactory";
viewContainerUtils.$inject = ["skeletonConfig", "$document"];

export const stringifyQueryUtils = function() {
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

  return reduceParams(queryProp);
};


stringifyQueryUtils.$inject = [];
stringifyQueryUtils.$name = "Utils.stringifyQueryParams";
stringifyQueryUtils.$type = "serviceFactory";


/* the array.prototype.find polyfill on npmjs.com is ~20kb (not worth it)
 * and lodash is ~200kb (not worth it)
 */

export function find(arr, func) {
  for (let i=0; i<arr.length; i++) {
    if (func(arr[i])) {
      return arr[i];
    }
  }

  return null;
}

find.$inject = [];
find.$name = "Utils.find";
find.$type = "serviceFactory";
