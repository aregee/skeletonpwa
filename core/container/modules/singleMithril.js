const defaultOpts = {
  // required opts
  Mithril: null,
  rootComponent: null,
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

  if (!opts.rootComponent) {
    throw new Error(`single-spa-mithril must be passed opts.rootComponent`);
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
    opts.rootComponent()
      .then((com) => {
        console.log(com);
        opts.Mithril.mount(getRootDomEl(opts), com.default);
        whenFinished();
      })
      .catch(err => {
        reject(err);
      })
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
