import {
  mix,
  GenericView,
  View,
  VentView
} from './mixins';



const onInstance = (container, {
  resolve,
  reject
}) => {
  container.factory('GenericView', function() {
    return GenericView;
  });
  container.factory('mix', function () {
    return mix;
  });
  container.factory('View', function () {
    return View
  });
  container.factory('VentView', function () {
    return VentView;
  });
  resolve(container);
}
export {
  mix
}

export const supportComponents = (ProgressiveEngine) => {
  ProgressiveEngine.onInstance(onInstance);
}
