import {
  skeletonEngine,
  skeletonPwa
} from '../../../bundle';

const skeletondemo = skeletonEngine.shell('skeletondemo');

skeletondemo.provider('notfound', function () {

  this.$get = function (container) {
    const $document = container.$document;
    const domApi = container.$createElement;
    const $window = container.$window;
    const Four0FourView = container.Four0FourView;
    let app = container.skeletondemo.app;
    const skeletondemoEngine = app.utils.api;
    let genUrl = app.utils.genUrl;
    let url = ['404', (parms = []) => skeletondemoEngine.get(`${genUrl('/app/404?', parms)}`)];
    container.datastore.set(url[0], url[1]);
    const four0four = (viewClassName, urlName, app) => {
      return (...props) => {
        let ngView = new Four0FourView(viewClassName, urlName, props, app.element, app);
        return ngView;
      }
    };
    return (viewClassName, urlName) => {
      return four0four(viewClassName, urlName, app);
    };
  }
});
