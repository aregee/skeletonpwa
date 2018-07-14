
export const Dom = function($createElement, skeletonConfig) {
  return $createElement(skeletonConfig.elements);
};

Dom.$name = "dom";
Dom.$inject = ["$createElement", "skeletonConfig"];