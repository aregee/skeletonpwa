export class View {
  constructor(
    viewClassName,
    urlName,
    routeParams,
    dom,
    app
  ) {
    this.viewClassName = viewClassName;
    this.urlName = urlName;
    this.routeParams = routeParams;
    this.app = app;
    this.dom = dom;
    this.template = null;
  }

  loadData() {

  }

  createTemplate() {

  }

  componentDidUpdate() {

  }

  render(renderFunc) {
    if (!!this.template.parentElement) {
      let newTemplate = renderFunc ? renderFunc() : this.createTemplate();
      this.template.parentElement.replaceChild(newTemplate, this.template);
      this.template = newTemplate;
      this.componentDidUpdate();
      this.template.classList.remove('loading');
    }
  }
}
