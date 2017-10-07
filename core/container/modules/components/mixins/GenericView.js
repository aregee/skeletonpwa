//
// datashop.vent.on('ngState', angularStatelistener);


export const GenericView = (superclass) => class extends superclass {
  constructor(
    viewClassName,
    urlName,
    routeParams,
    dom,
    datashop
  ) {
    super(viewClassName, urlName, routeParams, dom, datashop);
    this.genericPanel = [];

  }

  listener(...args) {

    let fn = function (component, ...params) {
      let dst = ({
        controller,
        data,
        name,
        url
      }) => {
        return {
          controller,
          data,
          name,
          url
        }
      }

      let uri = params.pop();
      console.log(params);
      let pushState = component.datashop.utils.genUrl(`/${component.urlName}/${component.datashop.utils.reduceParams({args: params[1], url: uri})}`);
      let replaceState = component.datashop.utils.genUrl(`/${component.urlName}/${component.datashop.utils.reduceParams({args: params[1], url: uri})}`);

      try {
        window.history.pushState(dst(params[2]), params[3], pushState);
      } catch (e) {
        window.history.replaceState(dst(params[2]), params[3], replaceState);
      }
    }
    let boundedFn = fn.bind(null, this);
    boundedFn(...args);
  }

  componentDidMount() {
    this.template = this.createFirstTemplate();
    this.loadData();
    return this.template;
  }

  componentDidUpdate() {
    console.log(this.viewClassName);
    this.datashop.vent.on([this.viewClassName, 'state', 'update'].join('.'), this.listener.bind(this));
  }

  createFirstTemplate() {
    return this.dom.div({
      className: this.viewClassName
    }, `<div class="content-loading">Loading content...</div>`);
  }

  createOfflineTemplate() {
    return this.dom.div({
      className: this.viewClassName
    }, `<div class="offline-content">
Failed to fetch new data. You might be offline and the data is not in cache yet.
<div class="logo-icon"></div>
</div>`);
  }
}
