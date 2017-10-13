!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.supportComponents=t.mix=void 0;var r=n(6),o=function(e,t){var n=t.resolve;t.reject;e.factory("GenericView",function(){return r.GenericView}),e.factory("mix",function(){return r.mix}),e.factory("View",function(){return r.View}),e.factory("VentView",function(){return r.VentView}),n(e)};t.mix=r.mix;t.supportComponents=function(e){e.onInstance(o)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Vent=t.supportComponents=t.supportRouterFactory=t.supportDomApi=t.supportApi=void 0;var r=n(19),o=n(20),i=n(21),u=n(22),a=n(0);t.supportApi=r.supportApi,t.supportDomApi=o.supportDomApi,t.supportRouterFactory=i.supportRouterFactory,t.supportComponents=a.supportComponents,t.Vent=u.Vent},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Vent=t.skeletonEngine=t.skeletonPwa=void 0;var r=n(3),o={};o.shell=function(e,t){return t?(r.skeletonPwa.provider(e,function(t){var n=t;this.$get=function(o){function i(t){t(this.app),this.app.vent.emit("engineLoaded",e,f)}var u=o.$document,a=o.apiFactory,c=o.$createElement,s=(o.$window,{}),l=t.viewContainer?t.viewContainer:".view-container";s.utils={},s.container=r.skeletonPwa,s.components={},s.element=c(n.elements),s.utils.api=a(n.api),s.utils.viewContainer=u.querySelector(l),s.components.views=new Map,s.vent=r.skeletonPwa.vent,s.appRouter=r.skeletonPwa.container.appRouter,s.utils.hooks={};var f={app:s};return f.run=i.bind(f),f}}),r.skeletonPwa.container[e]):r.skeletonPwa.container[e]},t.skeletonPwa=r.skeletonPwa,t.skeletonEngine=o,t.Vent=r.Vent},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Vent=t.skeletonPwa=void 0;var r=n(4),o=n(1);r.ProgressiveEngine.instanceWaiters=[],r.ProgressiveEngine.prototype.status=function(){return{active:this.active,name:this.name}},r.ProgressiveEngine.onInstance=function(e){r.ProgressiveEngine.instanceWaiters.push(e)};(0,o.supportDomApi)(r.ProgressiveEngine),(0,o.supportRouterFactory)(r.ProgressiveEngine),(0,o.supportApi)(r.ProgressiveEngine),(0,o.supportComponents)(r.ProgressiveEngine),function(e){var t=function(t,n){var r=n.resolve;n.reject;t.service("Vent",o.Vent),e.prototype.active=!0,r(t)};e.onInstance(t)}(r.ProgressiveEngine);var i=new r.ProgressiveEngine;t.skeletonPwa=i,t.Vent=o.Vent},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.ProgressiveEngine=void 0;var u=n(5),a=n(1);t.ProgressiveEngine=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));if(n.active)return o(n);for(t.Singleton=n,n.options={app:"Datashop"},n.vent=new a.Vent,n.instanceWaiterProps=[];t.instanceWaiters.length;){n.instanceWaiterProps.push(function(e){return new Promise(function(n,r){t.instanceWaiters.shift()(e,{resolve:n,reject:r})})}(n))}return n}return i(t,e),t}(u.AppShell)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.AppShell=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),c=n(11),s=function e(t){return t?(t^16*Math.random()>>t/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e)};t.AppShell=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.config={strict:!1},n.id=s,n.modules={},n.decorators={},n.nested={},n.providerMap={},n.originalProviders={},n.middlewares={},n.deferred=[];var i=n.register.bind(n),u=n.decorator.bind(n);return n.container={$decorator:u,$register:i,$list:n.list.bind(n)},n}return i(t,e),u(t,[{key:"getNested",value:function(e,t){var n=e[t];if(void 0===n&&this.globalConfig.strict)throw new Error("Container was unable to resolve a service.  `"+t+"` is undefined.");return n}},{key:"getNestedModule",value:function(e){return this.nested[e]||(this.nested[e]=t.module())}},{key:"getNestedService",value:function(e){return e.split(".").reduce(this.getNested,this)}}],[{key:"module",value:function(e){if("string"==typeof e){var n=this.modules[e];return n||(this.modules[e]=n=new t,n.constant("CONTAINER_NAME",e)),n}return new t}},{key:"clear",value:function(e){"string"==typeof e?delete this.modules[e]:this.modules={}}}]),t}((0,a.mix)(c.ProgressiveEngineShell).with(c.ProviderMixin,c.FactoryMixin,c.DecorateMixin,c.ConstantMixin,c.ValueMixin,c.MiddlewareMixin))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.VentView=t.mix=t.GenericView=t.View=void 0;var r=n(7),o=n(8),i=n(9),u=n(10);t.View=o.View,t.GenericView=r.GenericView,t.mix=i.mix,t.VentView=u.VentView},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.GenericView=function(e){return function(e){function t(e,n,i,u,a){r(this,t);var c=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,i,u,a));return c.genericPanel=[],c}return i(t,e),u(t,[{key:"listener",value:function(){(function(e){for(var t=function(e){return{controller:e.controller,data:e.data,name:e.name,url:e.url}},n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];var i=r.pop(),u=e.datashop.utils.genUrl("/"+e.urlName+"/"+e.datashop.utils.reduceParams({args:r[1],url:i})),a=e.datashop.utils.genUrl("/"+e.urlName+"/"+e.datashop.utils.reduceParams({args:r[1],url:i}));try{window.history.pushState(t(r[2]),r[3],u)}catch(e){window.history.replaceState(t(r[2]),r[3],a)}}).bind(null,this).apply(void 0,arguments)}},{key:"componentDidMount",value:function(){return this.template=this.createFirstTemplate(),this.loadData(),this.template}},{key:"componentDidUpdate",value:function(){this.datashop.vent.on([this.viewClassName,"state","update"].join("."),this.listener.bind(this))}},{key:"createFirstTemplate",value:function(){return this.dom.div({className:this.viewClassName},'<div class="content-loading">Loading content...</div>')}},{key:"createOfflineTemplate",value:function(){return this.dom.div({className:this.viewClassName},'<div class="offline-content">\nFailed to fetch new data. You might be offline and the data is not in cache yet.\n<div class="logo-icon"></div>\n</div>')}}]),t}(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.View=function(){function e(t,n,o,i,u){r(this,e),this.viewClassName=t,this.urlName=n,this.routeParams=o,this.datashop=u,this.dom=i,this.template=null}return o(e,[{key:"loadData",value:function(){}},{key:"createTemplate",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(e){if(this.template.parentElement){var t=e?e():this.createTemplate();this.template.parentElement.replaceChild(t,this.template),this.template=t,this.componentDidUpdate(),this.template.classList.remove("loading")}}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=(t.mix=function(e){return new i(e)},function(){function e(t){r(this,e),this.superclass=t}return o(e,[{key:"with",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return t(e)},this.superclass)}}]),e}())},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.VentView=function(e){return function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return i(t,e),u(t,[{key:"_render",value:function(){}},{key:"_mapDom",value:function(){}},{key:"_setEvents",value:function(){}},{key:"_handleClickEvent",value:function(e){}},{key:"_handleKeydownEvent",value:function(e){}},{key:"_removeEvents",value:function(){}}]),t}(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ValueMixin=t.MiddlewareMixin=t.ConstantMixin=t.DecorateMixin=t.FactoryMixin=t.ProviderMixin=t.ProgressiveEngineShell=void 0;var r=n(12),o=n(13),i=n(14),u=n(15),a=n(16),c=n(17),s=n(18);t.ProgressiveEngineShell=r.ProgressiveEngineShell,t.ProviderMixin=o.ProviderMixin,t.FactoryMixin=i.FactoryMixin,t.DecorateMixin=u.DecorateMixin,t.ConstantMixin=a.ConstantMixin,t.MiddlewareMixin=c.MiddlewareMixin,t.ValueMixin=s.ValueMixin},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.ProgressiveEngineShell=function e(t){if(r(this,e),!(this instanceof e))return e.module(t)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=Array.prototype.slice;t.ProviderMixin=function(e){return function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"reducer",value:function(e,t){return t(e)}},{key:"provider",value:function(e,t){var n=e.split(".");if(this.providerMap[e]&&1===n.length&&!this.container[e+"Provider"])return console.error(e+" provider already instantiated.");this.originalProviders[e]=t,this.providerMap[e]=!0;var r=n.shift();return n.length?(this.createSubProvider.call(this,r,t,n),this):this.createProvider.call(this,r,t)}},{key:"getWithGlobal",value:function(e,t){return(e[t]||[]).concat(e.__global__||[])}},{key:"createProvider",value:function(e,t){var n=(this.id(),this.container),r=(this.decorators,this.middlewares,e+"Provider"),o=Object.create(null);o[r]={configurable:!0,enumerable:!0,get:function(){var e=new t;return delete n[r],n[r]=e,e}};var i=function(e,t){var r=this.container[t],o=void 0;return r&&(o=this.getWithGlobal(this.decorators,e).reduce(this.reducer,r.$get(this.container)),delete n[t],delete n[e]),void 0===o?o:this.applyMiddleware(this.getWithGlobal(this.middlewares,e),e,o,this.container)},u=i.bind(this,e,r);return o[e]={configurable:!0,enumerable:!0,get:u},Object.defineProperties(n,o),this}},{key:"createSubProvider",value:function(e,t,n){var r=this.getNestedModule.call(this,e);return this.factory(e,function(){return r.container}),r.provider(n.join("."),t)}},{key:"register",value:function(e){var t=void 0===e.$value?e:e.$value;return this[e.$type||"service"].apply(this,[e.$name,t].concat(e.$inject||[]))}},{key:"removeProviderMap",value:function(e){delete this.providerMap[e],delete this.container[e],delete this.container[e+"Provider"]}},{key:"resetProviders",value:function(){var e=this.originalProviders;Object.keys(this.originalProviders).forEach(function(t){var n=t.split(".");n.length>1&&(this.removeProviderMap.call(this,n[0]),n.forEach(this.removeProviderMap,this.getNestedModule.call(this,n[0]))),this.removeProviderMap.call(this,t),this.provider(t,e[t])},this)}},{key:"resolve",value:function(e){return this.deferred.forEach(function(t){t(e)}),this}},{key:"service",value:function(e,t){var n=arguments.length>2?a.call(arguments,2):null,r=this;return this.factory.call(this,e,function(){var e=t;if(n){var o=n.map(this.getNestedService.bind(r),r.container);o.unshift(t),e=t.bind.apply(t,o)}return new e})}}]),t}(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.FactoryMixin=function(e){return function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"byMethod",value:function(e){return!/^\$(?:decorator|register|list)$|Provider$/.test(e)}},{key:"list",value:function(e){return Object.keys(e||this.container||{}).filter(this.byMethod)}},{key:"digest",value:function(e){return(e||[]).map(this.getNestedService.bind(this),this.container)}},{key:"factory",value:function(e,t){return this.provider.call(this,e,function(){this.$get=t})}},{key:"instanceFactory",value:function(e,t){return this.factory.call(this,e,function(e){return console.log(e),{instance:t.bind(t,e)}})}}]),t}(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.DecorateMixin=function(e){return function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"decorator",value:function(e,t){"function"==typeof e&&(t=e,e="__global__");var n=e.split("."),r=n.shift();return n.length?this.getNestedModule.call(this,r).decorator(n.join("."),t):(this.decorators[r]||(this.decorators[r]=[]),this.decorators[r].push(t)),this}},{key:"defer",value:function(e){return this.deferred.push(e),this}}]),t}(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.ConstantMixin=function(e){return function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"constant",value:function(e,t){var n=e.split(".");return e=n.pop(),this.defineConstant.call(n.reduce(this.setValueObject,this.container),e,t),this}},{key:"defineConstant",value:function(e,t){Object.defineProperty(this,e,{configurable:!1,enumerable:!0,value:t,writable:!1})}}]),t}(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.MiddlewareMixin=function(e){return function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"applyMiddleware",value:function(e,t,n,r){var o={configurable:!0,enumerable:!0};return e.length?o.get=function(){var t=0,r=function(o){if(o)throw o;e[t]&&e[t++](n,r)};return r(),n}:(o.value=n,o.writable=!0),Object.defineProperty(r,t,o),r[t]}},{key:"middleware",value:function(e,t){"function"==typeof e&&(t=e,e="__global__");var n=e.split("."),r=n.shift();return n.length?this.getNestedModule.call(this,r).middleware(n.join("."),t):(this.middlewares[r]||(this.middlewares[r]=[]),this.middlewares[r].push(t)),this}}]),t}(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.ValueMixin=function(e){return function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"value",value:function(e,t){var n=e.split(".");return e=n.pop(),this.defineValue.call(n.reduce(this.setValueObject,this.container),e,t),this}},{key:"setValueObject",value:function(e,t){var n=e[t];return n||(n={},this.defineValue.call(e,t,n)),n}},{key:"defineValue",value:function(e,t){Object.defineProperty(this,e,{configurable:!0,enumerable:!0,value:t,writable:!0})}}]),t}(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t=function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=0===n.indexOf("http")?{}:{"Content-Type":"application/json"},i=0===n.indexOf("http")?n:e+n;return Object.assign(r,{method:t,credentials:"same-origin",headers:r.headers?r.headers:o}),new Promise(function(e,t){fetch(i,r).then(function(n){if(n.ok)e(n.json());else{var r={};Object.assign(r,function(e){return{status:e.status,statusText:e.statusText,url:e.url}}(n)),r.traceback=n,r.message=n.json(),t(r)}}).catch(function(e){var n=new Error(e.toString());n.response=e,t(n)})})};return["GET","PUT","POST","DELETE"].forEach(function(e){t[e.toLowerCase()]=function(n,r){return t(e,n,r)}}),t},o=function(e,t){var n=t.resolve;t.reject;e.service("apiFactory",r),n(e)};t.supportApi=function(e){e.onInstance(o)}},function(e,t,n){"use strict";function r(e,t){var n=Math.round(Math.random()*Date.now()).toString(20).substr(0,4);Object.keys(e).forEach(function(n){return t[n]=e[n]}),t.setAttribute("uid",n)}function o(e,t){return!(!e||!e.match)&&(t.innerHTML=e,!0)}function i(e){return function(t,n){var i=document.createElement(e);return t&&r(t,i),n&&(n.map&&n.forEach(function(e){o(e,i)||i.appendChild(e)}),o(n,i)),i}}Object.defineProperty(t,"__esModule",{value:!0});var u=t.rDom=function(e){var t=function(e){return i(e)},n=["h1","div","span","article","a","nav","button"];return(Array.isArray(e)?n.concat(e):n).forEach(function(e){t[e.toLowerCase()]=t.bind(null,e)()}),t},a=function(e,t){var n=t.resolve;t.reject;e.service("$createElement",u),e.service("$window",window),e.service("$domq",document.querySelector),e.service("$document",document),n(e)};t.supportDomApi=function(e){e.onInstance(a)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.supportRouterFactory=function(e){var t=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];r(this,e),this.routes=t}return o(e,[{key:"route",value:function(e){return new Promise(function(e,t){return function(n,r){for(var o=0;o<t.length;o++){var i=t[o];if(i.test(e))return void n(i.component)}r({message:"component not found",status:404})}}(e,this.routes))}},{key:"patternToRegExp",value:function(e){return Array.isArray(e)?new RegExp(["^",e.map(function(e){return e.replace("*","[^/]+")+"$"}).join("|"),"$"].join(""),"i"):this.patternToRegExp([e])}},{key:"addRoute",value:function(e){return e.regex=this.patternToRegExp(e.pattern),e.test=function(t){return e.regex.test(t.split("?")[0])},this.routes.push(e),this}}]),e}(),n=function(e,n){var r=n.resolve;n.reject;e.factory("state",function(){return new t}),r(e)};e.onInstance(n)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.Vent=function(){function e(){r(this,e),this._collection=new Map}return o(e,[{key:"on",value:function(e,t){return this._collection.set(e,Array.isArray(this._collection.get(e))?this._collection.get(e):[]),this._collection.get(e).push(t),this}},{key:"once",value:function(e,t){function n(){r.off(e,n),t.apply(this,arguments)}var r=this;return n.listener=t,this.on(e,t),this}},{key:"off",value:function(e,t){var n=this._collection.get(e),r=0;if(Array.isArray(n)){for(r;r<n.length;r+=1)if(n[r]===t||n[r].listener===t){n.splice(r,1);break}0===n.length&&this.removeAllListeners(e)}return this}},{key:"removeAllListeners",value:function(e){return this._collection.delete(e),this}},{key:"listeners",value:function(e){return this._collection.get(e)}},{key:"emit",value:function(){var e,t=[].slice.call(arguments,0),n=t.shift(),r=this._collection.get(n),o=0;if(r)for(r=r.slice(0),e=r.length,o;o<e;o+=1)r[o].apply(this,t);return this}}]),e}()}]);