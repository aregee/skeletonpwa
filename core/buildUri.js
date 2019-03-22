export const buildUri = function(skeletonConfig) {
  const baseuri = () => skeletonConfig.prefixSite;
  return uri => {
    let startToken = uri[0];

    if (baseuri() === startToken) {
      return uri;
    }
    return `${baseuri()}${uri}`;
  };
};

buildUri.$name = "siteprefix";
buildUri.$type = "serviceFactory";
buildUri.$inject = ["skeletonConfig"];