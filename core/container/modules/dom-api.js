import { DomApi } from "webtoolkit";

export const supportDomApi = ProgressiveEngine => {
  const onInstance = (container, { resolve, reject }) => {
    container.service("$createElement", function() {
      return DomApi;
    });
    container.service("$window", function() {
      return window;
    });
    container.service("$domq", function() {
      return qs => document.querySelector(qs);
    });
    container.service("$document", function() {
      return window.document;
    });
    resolve(container);
  };

  ProgressiveEngine.onInstance(onInstance);
};
