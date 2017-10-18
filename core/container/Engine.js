import {
  AppShell
} from './LazyContainer';
import {
  Vent
} from './modules';


export class ProgressiveEngine extends AppShell {
  constructor(name) {
    super(name);
    if (this.active) {
      return;
    }
    ProgressiveEngine.Singleton = this;
    this.options = {
      app: 'skeleton'
    }
    this.vent = new Vent();

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
