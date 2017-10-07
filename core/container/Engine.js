import {
  Container
} from './Container';

export class ProgressiveEngine extends Container {
  constructor() {
    super();
    if (this.active) {
      return;
    }
    ProgressiveEngine.Singleton = this;
    this.options = {
      app: 'Datashop'
    }

    this.instanceWaiterProps = [];
    while (ProgressiveEngine.instanceWaiters.length) {
      let instanceWaiters = (instance) => {
        return new Promise(function (resolve, reject) {
          ProgressiveEngine.instanceWaiters.shift()(instance, {
            resolve,
            reject
          });
        });
      };
      this.instanceWaiterProps.push(instanceWaiters(this));
    }
  }
}
