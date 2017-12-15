import {
  skeletonEngine,
} from '../bundle';

const skeletondemoApp = skeletonEngine.bootstrap('skeletondemo', {
  api: `http://localhost:3000`,
  elements: ['ul', 'li', 'section', 'tr', 'td', 'table', 'tbody', 'thead', 'body', 'script', 'style', 'img', 'form', 'input']
});


var req = require.context('./packages', true, /\.js$/);
req.keys().map(req);

// require.ensure([], function (require) {
//   // // require('./packages/404/component');
//   // require('./packages/app1/app1')
//   // require('./packages/mdeditor/editor');
//   // require('./packages/router');
//   // req.keys().map((r) => {
//   //   console.log(r);
//   // });
// });

skeletondemoApp.shell('skeletondemo').run((app) => {
  console.log(app);
  let singleSpa = app.core.container.singleSpa;
  singleSpa.start();
});
