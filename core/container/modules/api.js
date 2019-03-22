import { ApiFactory } from "webtoolkit";

const onInstance = (container, { resolve, reject }) => {
  container.service("http", function() {
    return ApiFactory;
  });
  resolve(container);
};

export const supportApi = ProgressiveEngine => {
  ProgressiveEngine.onInstance(onInstance);
};
