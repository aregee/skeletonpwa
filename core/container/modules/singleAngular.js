const defaultOpts = {
	// required opts
	angular: null,
	domElementGetter: null,
	mainAngularModule: null,

	// optional opts
	uiRouter: false,
	preserveGlobal: false,
	elementId: '__single_spa_angular_1',
	strictDi: false,
	template: undefined,
};
const appManager = new function () {
    this.currentAppName;
    this.currentApp;

    this.startApp = function (bootstrapel,{mainAngularModule , angular, strictDi}) {
        if (this.currentApp) {
            this.destroyApp(this.currentApp, this.currentAppName);
        }
        var appContainer = bootstrapel;
        if (appContainer) {
            this.currentAppName = mainAngularModule;
            this.currentApp = angular.bootstrap(appContainer, [mainAngularModule], {strictDi: strictDi});
		}
		return this.currentApp;
    }

    this.destroyApp = function (app, appName) {
        var $rootScope = app.get('$rootScope');
        $rootScope.$destroy();
    }
}

export default function singleSpaAngular1(userOpts) {
	if (typeof userOpts !== 'object') {
		throw new Error(`single-spa-angular1 requires a configuration object`);
	}

	const opts = {
		...defaultOpts,
		...userOpts,
	};

	if (!opts.angular) {
		throw new Error(`single-spa-angular1 must be passed opts.angular`);
	}

	if (!opts.domElementGetter) {
		throw new Error(`single-spa-angular1 must be passed opts.domElementGetter function`);
	}

	if (!opts.mainAngularModule) {
		throw new Error(`single-spa-angular1 must be passed opts.mainAngularModule string`);
	}

	// A shared object to store mounted object state
	const mountedInstances = {};

	return {
		bootstrap: bootstrap.bind(null, opts, mountedInstances),
		mount: mount.bind(null, opts, mountedInstances),
		unmount: unmount.bind(null, opts, mountedInstances),
	};
}

function bootstrap(opts) {
	return Promise.resolve();
}



function mount(opts, mountedInstances) {
	return Promise
		.resolve()
		.then(() => {
			window.angular = opts.angular;
			const containerEl = getContainerEl(opts);
			const bootstrapEl = containerEl;

			if (opts.uiRouter) {
				const uiViewEl = document.createElement('div');
				uiViewEl.setAttribute('ui-view', opts.uiRouter === true ? "" : opts.uiRouter);
				bootstrapEl.appendChild(uiViewEl);
			}

			if (opts.template) {
				bootstrapEl.innerHTML = opts.template;
			}
			mountedInstances.instance = appManager.startApp(bootstrapEl, opts);
	});
}

function unmount(opts, mountedInstances) {
	console.log(mountedInstances)
	return new Promise((resolve, reject) => {
		console.log(mountedInstances, opts);
		appManager.destroyApp(mountedInstances.instance, opts.mainAngularModule);
		// delete mountedInstances.instance
		// getContainerEl(opts).innerHTML = '';
		if (opts.angular === window.angular && !opts.preserveGlobal)
			delete window.angular;
		setTimeout(resolve);
	});
}

function getContainerEl(opts) {
	const element = opts.domElementGetter();
	if (!element) {
		throw new Error(`domElementGetter did not return a valid dom element`);
	}

	return element;
}
