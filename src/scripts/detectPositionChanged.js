import { Vec3 } from "playcanvas";
import { Script } from "../systems/script/script";
import { SceneManager } from "../Scene/SceneManager";

export const DetectPositionChanged = Script.createScript({
  name: "detectPositionChanged",
  attributes: {
    delta: { default: 1 },
    onPositionChanged: { default: () => { } },
  },

  lastPosition: new Vec3(),
  currentPosition: new Vec3(),

  update() {
    if (!SceneManager.currentScene.isPause) {
      this.currentPosition = this.entity.getPosition();
      if (this.currentPosition.distance(this.lastPosition) > this.delta) {
        this.lastPosition.x = this.currentPosition.x;
        this.lastPosition.y = this.currentPosition.y;
        this.lastPosition.z = this.currentPosition.z;
        this.onPositionChanged(this.currentPosition.clone());
      }
    }
  },
});
