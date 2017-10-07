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
  container.register('GenericView', GenericView);
  container.register('mix', mix);
  container.register('View', View);
  container.register('VentView', VentView);
  resolve(container);
}

export const supportComponents = (ProgressiveEngine) => {
  ProgressiveEngine.onInstance(onInstance);
}
