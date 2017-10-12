
export class ProgressiveEngineShell {
  constructor(name) {
    if (!(this instanceof ProgressiveEngineShell)) {
      return ProgressiveEngineShell.module(name);
    }
  }
}
