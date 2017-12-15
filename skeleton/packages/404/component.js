import {
  skeletonEngine,
  skeletonPwa
} from '../../../bundle';
// export {
//   fourOfour,
//   notFound
// }
// from './404';

const skeletondemo = skeletonEngine.shell('skeletondemo');
import ('./404')
.then(({
  fourOfour,
  notFound
}) => {
  skeletondemo.factory('Four0FourView', fourOfour);
  skeletondemo.provider('notfound', notFound);
});
