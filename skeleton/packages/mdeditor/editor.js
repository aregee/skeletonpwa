import {
  skeletonEngine,
  skeletonPwa
} from '../../../bundle';

const skeletondemo = skeletonEngine.shell('skeletondemo');

skeletondemo.factory('MithrilEditor', function (container) {
  const mix = container.mix;
  const GenericView = container.GenericView;
  const View = container.View;

  class MithrilEditor extends mix(View).with(GenericView) {
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
      // super.loadData();
      this.template.classList.add('loading');

      // Set the page number in address bar
      // history.pushState(null, null, this.skeletondemo.utils.genUrl('/editor'));
      let store = (...parms) => {
        let mithPanel = this.dom.div({
          id: 'example'
        });

        return new Promise(function (resolve, reject) {
          resolve({
            panel: mithPanel
          });
        });
      }
      //this.app.core.container.datastore.get(this.urlName);

      store(['top', 'panel', 'bottom']).then(res => {
          console.log(res.panel);
          this.panels = this.panels.concat([res.panel]);
          this.render();
        })
        .catch(e => {
          console.log('You are offline');
          this.render();
        });
    }


    createTemplate() {
      let str = this.panels.join('');
      let scripts = ['/skeletonpwa/bundle/public/editor.js'];
      let inculdes = scripts.map(m => this.dom.script({
        async: true,
        src: m
      }));
      let editor = this.dom.div({
        id: "editor"
      }, []);
      let pannel = this.dom.div({
        id: "skeletondemo-mithril",
        style: "height:82vh"
      }, [].concat(inculdes));
      pannel.appendChild(editor);
      pannel.appendChild(this.dom.style({}, [`<style>
  html,body {height:100%;margin:0;}
  h1,h2,h3,h4,h5,h6,p {margin:0 0 10px;}
  #editor {display:flex;height:100%;}
  .input,.preview {box-sizing:border-box;height:100%;margin:0;padding:10px;width:50%;}
  .input {border:0;border-right:1px solid #ccc;outline:none;resize:none;}
  		</style>`]))
      // console.log(pannel);
      return pannel;
    }

    render() {
      super.render();
      if (!!this.template.parentElement) {
        let newTemplate = this.createTemplate();
        this.template.parentElement.replaceChild(newTemplate, this.template);
        this.template = newTemplate;
      }
    }
  }

  return MithrilEditor;

});

skeletondemo.provider('mdeditor', function () {
  this.$get = function (container) {
    const MithrilEditor = container.MithrilEditor;
    const MithrilView = container.MithrilView;
    const app = container.skeletondemo.app;
    const router = container.state;
    const datastore = container.datastore;
    const skeletondemoEngine = app.utils.api;
    let genUrl = app.utils.genUrl;
    let url = ['core', (parms = []) => skeletondemoEngine.get(genUrl('/app/mith?', parms))];
    datastore.set(url[0], url[1]);
    const editorView = (viewClassName, urlName, app) => {
      return (...props) => {
        let ngView = new MithrilEditor(viewClassName, urlName, props, app.element, app);
        return ngView;
      }
    };

    return editorView;
  }
});

skeletondemo.app.vent.on('engineLoaded', function (name, app) {
  let editorView = skeletondemo.app.core.container.mdeditor;
  let router = skeletondemo.app.appRouter;

  router.addRoute({
    component: editorView('editor-view', 'core', skeletondemo.app),
    pattern: ['/editor/.+', '/editor']
  });

});
