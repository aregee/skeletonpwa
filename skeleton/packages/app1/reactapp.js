import React from 'react';
import ReactDOM from 'react-dom';


import Root from './root.component.js';

export const reactAppProvider = function () {

  this.$get = function (container) {
    const singleSpaReact = container.singleSpaReact;

    function domElementGetter() {
      // Make sure there is a div for us to render into
      let el = document.getElementById('app1');
      if (!el) {
        el = document.createElement('div');
        el.id = 'app1';
        document.body.appendChild(el);
      }

      return el;
    }

    const reactLifecycles = singleSpaReact({
      React,
      ReactDOM,
      rootComponent: Root,
      domElementGetter,
    });

    function bootstrap(props) {
      return reactLifecycles.bootstrap(props);
    }

    function mount(props) {
      return reactLifecycles.mount(props);
    }

    function unmount(props) {
      return reactLifecycles.unmount(props);
    }

    return {
      bootstrap,
      mount,
      unmount
    };
  };

};

export const ReactAppView = function (container) {
  const mix = container.mix;
  const GenericView = container.GenericView;
  const View = container.View;
  const singleSpa = container.singleSpa;
  const app1 = container.app1;
  console.log(app1);

  function hashPrefix(prefix) {
    return function (location) {
      return location.hash.startsWith(`#${prefix}`);
    }
  }
  class ReactView extends mix(View).with(GenericView) {
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

      singleSpa.declareChildApplication('app-1', () => Promise.resolve(app1), hashPrefix('/app1'));
      let store = (...parms) => {
        let mithPanel = this.dom.div({
          id: 'app1'
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
      console.log(str);
      let pannel = this.dom.div({
        id: "app1",
        style: "height:82vh"
      });
      // pannel.appendChild(editor);
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

  return ReactView;

};


export const reactview = function () {
  this.$get = function (container) {
    const ReactView = container.ReactView;
    const app = container.skeletondemo.app;
    const router = container.state;
    const datastore = container.datastore;
    const skeletondemoEngine = app.utils.api;
    let genUrl = app.utils.genUrl;
    let url = ['core', (parms = []) => skeletondemoEngine.get(genUrl('/app/mith?', parms))];
    datastore.set(url[0], url[1]);
    const reactview = (viewClassName, urlName, app) => {
      return (...props) => {
        let ngView = new ReactView(viewClassName, urlName, props, app.element, app);
        return ngView;
      }
    };

    return reactview;
  }
};
