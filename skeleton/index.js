import {
  skeletonEngine,
} from '../bundle';

const skeletondemoApp = skeletonEngine.bootstrap('skeletondemo', {
  api: `http://localhost:3000`,
  elements: ['ul', 'li', 'section', 'tr', 'td', 'table', 'tbody', 'thead', 'body', 'script', 'style', 'img', 'form', 'input']
});

var req = require.context('./packages', true, /\.js$/);
req.keys().map(req);

skeletondemoApp.shell('skeletondemo').run((app) => {
    console.log(app);
    let singleSpa = app.core.container.singleSpa;
    singleSpa.start();
});
