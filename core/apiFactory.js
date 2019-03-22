export const apiFactory = function(http, skeletonConfig) {
  return new http({ apiBase: skeletonConfig.api });
};
apiFactory.$name = "api";
apiFactory.$type = "serviceFactory";
apiFactory.$inject = ["http", "skeletonConfig"];
