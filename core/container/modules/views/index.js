import {
  GenericView,
  View,
  VentView
} from 'webtoolkit';



const onInstance = (container, {
  resolve,
  reject
}) => {
  container.service('GenericView', function() {
    return GenericView;
  });
  container.service('View', function () {
    return View;
  });
  container.service('VentView', function () {
    return VentView;
  });

  resolve(container);
}

export const supportComponents = (ProgressiveEngine) => {
  ProgressiveEngine.onInstance(onInstance);
}
