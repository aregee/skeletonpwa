import {
  Vent
} from './modules/eventbus';


export class Container {
  constructor() {
    this._bindings = {};
    this.vent = new Vent();
  }

  register(service_name, service_provider, allow_override = false) {
    if (this.isBound(service_name)) {
      if (allow_override) {
        this._bindings[service_name] = service_provider;
      } else {
        this.vent.emit('log.error', {
          msg: `Container error: Service ${service_name} is already bound and override is not allowed. ' +
          'Pass true as second argument to Container.register() to allow override.`
        });
        return false;
      }
    } else {
      this._bindings[service_name] = service_provider;
    }
  }

  get(service_name) {
    if (this._bindings[service_name] !== undefined) {
      return this._bindings[service_name];
    } else {
      console.error('Container error: Service "' + service_name + '" is not bound. Use Container.bind() first.');
      return false;
    }
  }

  isBound(service_name) {
    return this._bindings[service_name] !== undefined;
  }

  getRegisteredBindingsfunction() {
    var a = [];
    for (var key in this._bindings) {
      a.push(key);
    }
    return a;
  }

};
