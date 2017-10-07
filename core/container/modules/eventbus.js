export class Vent {
  constructor() {
    this._collection = new Map();
  }

  /**
   * Adds a listener to the collection for a specified event.
   * @public
   * @function
   * @name Vent#on
   * @param {string} event Event name.
   * @param {function} listener Listener function.
   * @example
   * // Will add a event listener to the "ready" event
   * let doSomeStuff = function (event, param1, param2, ...) {
   *   // Some code here!
   * };
   *
   * me.on("ready", doSomeStuff);
   */

  on(event, listener) {
    this._collection.set(event, Array.isArray(this._collection.get(event)) ? this._collection.get(event) : []);
    this._collection.get(event).push(listener);
    return this;

  }


  /**
   * Adds a one time listener to the collection for a specified event. It will execute only once.
   * @public
   * @function
   * @name Vent#once
   * @param {string} event Event name.
   * @param {function} listener Listener function.
   * @returns itself
   * @example
   * // Will add a event handler to the "contentLoad" event once
   * me.once("contentLoad", startDoingStuff);
   */

  once(event, listener) {
    let $this = this;

    function fn() {
      $this.off(event, fn);
      listener.apply(this, arguments);
    }
    fn.listener = listener;
    this.on(event, listener);
    return this;
  }



  /**
   * Removes a listener from the collection for a specified event.
   * @public
   * @function
   * @name Vent#off
   * @param {string} event Event name.
   * @param {function} listener Listener function.
   * @returns itself
   * @example
   * // Will remove event handler to the "ready" event
   * var startDoingStuff = function () {
   *   // Some code here!
   * };
   *
   * me.off("ready", startDoingStuff);
   */
  off(event, listener) {

    let listeners = this._collection.get(event),
      j = 0;

    if (Array.isArray(listeners)) {
      for (j; j < listeners.length; j += 1) {
        if (listeners[j] === listener || listeners[j].listener === listener) {
          listeners.splice(j, 1);
          break;
        }
      }

      if (listeners.length === 0) {
        this.removeAllListeners(event);
      }
    }

    return this;
  }


  /**
   * Removes all listeners from the collection for a specified event.
   * @public
   * @function
   * @name Vent#removeAllListeners
   * @param {string} event Event name.
   * @returns itself
   * @example
   * me.removeAllListeners("ready");
   */
  removeAllListeners(event) {
    delete this._collection.delete(event);
    return this;
  }


  /**
   * Returns all listeners from the collection for a specified event.
   * @public
   * @function
   * @name Vent#listeners
   * @param {string} event Event name.
   * @returns Array
   * @example
   * me.listeners("ready");
   */
  listeners(event) {
    // this._collection = this._collection || {};
    return this._collection.get(event);
  }


  /**
   * Execute each item in the listener collection in order with the specified data.
   * @name Vent#emit
   * @public
   * @protected
   * @param {string} event The name of the event you want to emit.
   * @param {...object} var_args Data to pass to the listeners.
   * @example
   * // Will emit the "ready" event with "param1" and "param2" as arguments.
   * me.emit("ready", "param1", "param2");
   */
  emit() {
    // if (this._collection === undefined) {
    //   return this;
    // }

    var args = [].slice.call(arguments, 0), // converted to array
      event = args.shift(),
      listeners = this._collection.get(event),
      i = 0,
      len;

    if (listeners) {
      listeners = listeners.slice(0);
      len = listeners.length;
      for (i; i < len; i += 1) {
        listeners[i].apply(this, args);
      }
    }

    return this;
  }

}
