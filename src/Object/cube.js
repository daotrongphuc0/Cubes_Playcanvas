import { Color, Entity, StandardMaterial } from "playcanvas";
import { MoveWithPath } from "../scripts/move/moveWithPath";
import { GameConstant } from "../GameConstant";
import { AssetsLoader } from "../assets/AssetsLoader";
import { Helper } from "../Helper/Helper";
import { SceneManager } from "../Scene/SceneManager";
import { Wall } from "./Wall";

export class Cube extends Entity {
  constructor(number = 64) {
    super("cube");
    this.number = number;

    this.material = new StandardMaterial();
    this.textEntity = new Entity();

    this.speedUp = false

    this.modelAsset = AssetsLoader.getAssetByKey("box")
    this.addComponent("model", { asset: this.modelAsset });
    this.mover = this.addScript(MoveWithPath, {
      speed: GameConstant.PLAYER_SPEED,
    });

    this.manager = null

    this.activeMove(false);
    this.updateScale();
    this.initText();
    this.updateColor();

    this.addComponent("rigidbody", {
      type: "kinematic",
    });

    this.addComponent('collision', {
      type: 'box',
      halfExtents: new pc.Vec3(this.getLocalScale().x, this.getLocalScale().y, this.getLocalScale().z)
    });
  }

  reset(delayTime) {
    this.activeMove(true);
    this.mover.reset(delayTime);
  }

  set z(z) {
    let pos = this.getPosition();
    this.setPosition(pos.x, pos.y, z);
  }

  activeMove(active) {
    this.mover.enabled = active;
  }

  updateScale() {
    var scale = Helper.getScaleByNumber(this.number)
    this.setLocalScale(scale, scale, scale)
  }

  levelUp() {
    this.number *= 2;
    this.updateScale();
    this.updateText();
    this.updateColor();
  }

  updateChance(num) {
    this.number = num;
    this.updateScale();
    this.updateText();
    this.updateColor();
  }

  destroy() {
    super.destroy()
  }

  initText() {
    this.textEntity.addComponent("element", {
      type: "text",
      text: Helper.getStringByNumber(this.number),
      fontAsset: AssetsLoader.getAssetByKey("CanvasFont"),
      fontSize: 32,
      pivot: new pc.Vec2(0.5, 0.5),
      width: 200,
      height: 50,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5)
    });

    this.textEntity.setLocalPosition(0, 2, -0.02);
    this.textEntity.setLocalEulerAngles(-90, -90, 0)
    this.textEntity.setLocalScale(0.023, 0.023, 0.023);
    this.addChild(this.textEntity);
  }

  updateText() {
    this.textEntity.element.text = Helper.getStringByNumber(this.number);
  }

  updateColor() {
    this.material.diffuse = Helper.getColorByNumber(this.number);
    this.material.update()
    this.model.meshInstances[0].material = this.material
  }

  speedIncrease(speed) {
    if (!this.speedUp) {
      this.mover.setSpeed(speed)
      this.speedUp = true
      this.mover.reset(this.mover.delayTime * (this.mover.speed / (speed * GameConstant.RATE_DELAYTIME)))
    }
  }

  speedReduce(speed) {
    if (this.speedUp) {
      this.speedUp = false
      this.mover.setSpeed(speed)
      this.mover.reset(this.mover.delayTime * (this.mover.speed / speed) * GameConstant.RATE_DELAYTIME)
    }
  }

}