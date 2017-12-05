import {
  skeletonEngine,
  skeletonPwa
} from '../../../bundle';


const skeletondemo = skeletonEngine.shell('skeletondemo');

skeletondemo.provider('router', function () {

  // this is the service factory.
  this.$get = function (shell) {

    // View Container
    let container;
    let currentView;
    let anchorTags;
    let hooks = {
      beforeMount: () => {},
      afterMount: () => {}
    }

    const $window = shell.$window;
    const $document = shell.$document;

    function _cleanContainer() {
      if (currentView && currentView.parentElement) {
        currentView.parentElement.removeChild(currentView);
      }

      container.innerHTML = '';
    }

    function mountRouteElement(elem, routeParams) {
      _cleanContainer();

      currentView = elem({
        container,
        routeParams
      }).componentDidMount();

      container.appendChild(currentView);
      hooks.afterMount();
      skeletonPwa.vent.emit('loadngapp', skeletondemo.app);
    }


    /**
     * Returns the location params from url
     * @returns {object}
     */
    function getLocationParams() {
      let out = {};

      // Parse the location object
      location.search.substr(1).split('&').forEach(parts => {
        let values = parts.split('=');
        out[values[0]] = values[1];
      });

      return out;
    }

    const loadRoute = () => {

      let currentRoute = $window.location.hash;
      let path = currentRoute.split('#').pop();
      shell.state.route(path)
        .then((c) => {
          let route = c;
          let navLink = $document.querySelector(`#skeleton-nav a[href="${currentRoute}"]`);
          let currentActiveLink = $document.querySelector(`#skeleton-nav a.active`);
          if (currentActiveLink) currentActiveLink.classList.remove('active');
          if (navLink) navLink.classList.add('active');
          hooks.beforeMount(route, currentRoute);
          mountRouteElement(route, getLocationParams());
        })
        .catch((e) => {
          mountRouteElement(shell.notfound('404', '404'), getLocationParams())
        });
    };

    $window.handleOnClick = function handleOnClick(e) {

      let path = e.target.getAttribute('href');

      e.stopImmediatePropagation();
      e.preventDefault();

      // Push the state
      // $window.history.pushState(null, null, path);
      $window.handlePushState(['#', path].join(''));

      return false;
    };

    $window.handlePushState = (p) => {
      // Push the state
      $window.history.pushState(null, null, p);
      loadRoute();
    }
    $window.onpopstate = function (event) {
      $window.handlePushState();
    };

    const initialize = (routesDefinition, containerElement, hooksDefinition) => {
      container = containerElement;

      // Assign the onclick action
      anchorTags = [].slice.call($document.querySelectorAll('#skeleton-nav .view'));
      anchorTags.forEach(node => node.onclick = $window.handleOnClick);

      loadRoute();
    };

    return {
      initialize
    };

  };
}).factory('supportRouter', function (container) {
  let router = container.router;
  const supportRouter = (app) => {
    let init = ({
      routes,
      viewContainer,
      hooks
    }) => {
      return router.initialize(routes, viewContainer, hooks);
    }
    init(app.utils);
  }
  return supportRouter;
});



skeletondemo.app.vent.on('engineLoaded', function (name, app) {
  skeletondemo.app.core.container.supportRouter(app);
});
