const defaultOpts = {
  // required opts
  Mithril: null,
  rootComponent: null,
  prefix: '?',
  domElementGetter: null,
}

export default function singleSpaMithril(userOpts) {
  if (typeof userOpts !== 'object') {
    throw new Error(`single-spa-mithril requires a configuration object`);
  }

  const opts = {
    ...defaultOpts,
    ...userOpts,
  };

  if (!opts.Mithril) {
    throw new Error(`single-spa-mithril must be passed opts.Mithril`);
  }

  if (!opts.rootComponent && !opts.routes) {
    throw new Error(`single-spa-mithril must be passed opts.rootComponent or opts.routes`);
  }

  if (!opts.domElementGetter) {
    throw new Error(`single-spa-mithril must be passed opts.domElementGetter function`);
  }

  return {
    bootstrap: bootstrap.bind(null, opts),
    mount: mount.bind(null, opts),
    unmount: unmount.bind(null, opts),
  };
}

function bootstrap(opts) {
  return Promise.resolve();
}

function mount(opts) {
  return new Promise((resolve, reject) => {
    const whenFinished = resolve;
    let routes = opts.routes ? opts.routes: false;
    if (typeof routes !== 'object') {
      opts.Mithril.mount(getRootDomEl(opts), opts.rootComponent);
    } else {
      opts.Mithril.route.prefix(opts.prefix);
      opts.Mithril.route(getRootDomEl(opts), opts.base, opts.routes);
      opts.stateInit()
    }

    whenFinished();
  })
}

function unmount(opts) {
  return Promise
    .resolve()
    .then(() => {
      opts.Mithril.mount(getRootDomEl(opts), null);
    });
}

function getRootDomEl(opts) {
  const el = opts.domElementGetter();
  if (!el) {
    throw new Error(`single-spa-mithril: domElementGetter function did not return a valid dom element`);
  }

  return el;
}
