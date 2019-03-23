require("browser-env")();
const o = require("ospec");
const { skeletonPwa , skeletonEngine} = require("../bundle");

new function(o) {
  let clone = o.new();
  let describe = clone.spec;
  let it = clone;
  let expect = clone;
  /**
   * skeletonPwa API test suite
   */
  describe("skeletonPwa# API", function() {
    it("skeletonPwa extends lazyIoc to provide singleton container instance", function() {
      expect(skeletonPwa.active).equals(true);
      skeletonPwa.constant("permanent", "abc");
      expect(skeletonPwa.container.permanent).equals("abc");

      try {
        skeletonPwa.container.permanent = "xyz";
      } catch (e) {
        // TypeError: Attempted to assign to readonly property.
      }
      expect(skeletonPwa.container.permanent).equals("abc");

      try {
        delete skeletonPwa.container.permanent;
      } catch (e) {
        // TypeError: Unable to delete property.
      }
      expect(skeletonPwa.container.permanent).equals("abc");
      const sPwa = require("../bundle").skeletonPwa;
      expect(sPwa).equals(skeletonPwa);
    });

    it("expect skeletonPwa to expose a component which is a function", () => {
      it(typeof skeletonPwa.component).equals("function");
    });
    it("expect skeletonPwa expose a componentFactory which is a function", () => {
      it(typeof skeletonPwa.componentFactory).equals("function");
    });
    it("expect skeletonPwa expose a configure which is a function", () => {
      it(typeof skeletonPwa.configure).equals("function");
    });

    it("expect skeletonPwa expose a addRuntime which is a function", () => {
      it(typeof skeletonPwa.addRuntime).equals("function");
    });

    it("expect skeletonPwa expose a runAll which is a function", () => {
      it(typeof skeletonPwa.runAll).equals("function");
    });

    it("expect skeletonPwa expose a resolveAll which is a function", () => {
      it(typeof skeletonPwa.resolveAll).equals("function");
    });
  });

  describe('skeletonEngine#API', function() {
    it('expect skeletonEngine to expose a shell function', ()=> {
      it(typeof skeletonEngine.shell).equals("function");
    });
    it('expect skeletonEngine to expose a bootstrap function', ()=> {
        it(typeof skeletonEngine.bootstrap).equals("function");
      });
  });

  clone.run();
}(o);
