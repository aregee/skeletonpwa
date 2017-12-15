import {
  skeletonEngine,
  skeletonPwa
} from '../../../bundle';

import {
  panel
} from '../../assets/404';

const skeletondemo = skeletonEngine.shell('skeletondemo');

skeletondemo.factory('Four0FourView', function(container) {
  const mix = container.mix;
  const GenericView = container.GenericView;
  const View = container.View;
  const $window = container.$window;
  const $document = container.$document;

  class Four0FourView extends mix(View).with(GenericView) {
    constructor(
      viewClassName,
      urlName,
      routeParams,
      dom,
      app
    ) {
      super(viewClassName, urlName, routeParams, dom, app);
      this.panels = [];
    }
    loadData() {
      super.loadData();
      this.template.classList.add('loading');
      let store = (parms) => {
        return new Promise(function(resolve, reject) {
          resolve(panel);
        });
      }
      store(['panel']).then(res => {
          this.panels = this.panels.concat([res]);
          this.render();
        })
        .catch(e => {
          console.log('You are offline');
          this.render();
        });
    }


    createTemplate() {
      let str = this.panels.join('');
      let scripts = [];
      let inculdes = scripts.map(m => this.dom.script({}, [`var path = document.getElementById('tail');
    path.setAttribute('d','M89,315c2.2-15.2-23-13.2-21.6,4.8c1.7,22.3,24.4,22.1,42.5,9.1c10.8-7.8,15.3-1.8,19.1,1.1 c2.3,1.7,6.7,3.3,11-3');`]));
      return this.dom.div({
        id: "skeletondemo-404",
        className: "container-shell me404"
      }, [str, this.dom.div({
        id: 'app1'
      })].concat(inculdes));
    }
  }

  // skeletondemo.app.container.register('Four0FourView', Four0FourView);
  return Four0FourView;

});
