import {
  skeletonEngine,
  skeletonPwa
} from '../../../bundle';
import {
  reactAppProvider,
  ReactAppView,
  reactview
} from './reactapp';
const skeletondemo = skeletonEngine.shell('skeletondemo');

skeletondemo.provider('app1', reactAppProvider);
skeletondemo.factory('ReactView', ReactAppView);
skeletondemo.provider('reactview', reactview);
skeletondemo.app.vent.on('engineLoaded', function (name, app) {
  let reactView = skeletondemo.app.core.container.reactview;
  let router = skeletondemo.app.appRouter;

  router.addRoute({
    component: reactView('react-view', 'core', skeletondemo.app),
    pattern: ['/app1/.+', '/app1']
  });

});
