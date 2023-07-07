import { Color, Entity, StandardMaterial } from "playcanvas";
import { MoveWithPath } from "../scripts/moveWithPath";
import { GameConstant } from "../GameConstant";
import { AssetsLoader } from "../assets/AssetsLoader";
import { Helper } from "../Helper/Helper";

export class Cube extends Entity {
  constructor(number = 64) {
    super("cube");
    this.number = number;

    this.type = 2

    this.material = new StandardMaterial();
    this.textEntity = new Entity();

    this.modelAsset = AssetsLoader.getAssetByKey("box")
    this.addComponent("model", { asset: this.modelAsset });
    this.mover = this.addScript(MoveWithPath, {
      speed: GameConstant.PLAYER_SPEED,
    });

    this.manager = null

    this.activeMove(false);
    this.updateScale();
    this.updateText();
    this.updateColor();

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

  destroy() {
    super.destroy()
  }

  updateText() {
    AssetsLoader.createCanvasFont("Arial", 106, "bold");
    this.textEntity.addComponent("element", {
      type: "text",
      text: Helper.getStringByNumber(this.number),
      fontAsset: AssetsLoader.getAssetByKey("CanvasFont"),
      fontSize: 32,
      pivot: new pc.Vec2(0.5, 0.5), // Đặt pivot ở vị trí trung tâm của Text Element
      width: 200, // Điều chỉnh kích thước theo nhu cầu của bạn
      height: 50,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5) // Đặt anchor ở vị trí trung tâm của Text Element
    });

    // Gắn Text Element vào Entity
    this.textEntity.setLocalPosition(0, 2, -0.02); // Đặt vị trí của Text Element trong hình hộp
    this.textEntity.setLocalEulerAngles(-90, -90, 0)
    this.textEntity.setLocalScale(0.023, 0.023, 0.023);
    this.addChild(this.textEntity);
  }

  updateColor() {
    this.material.diffuse = Helper.getColorByNumber(this.number);
    this.material.update()
    this.model.meshInstances[0].material = this.material
  }

  destroy() {
    super.destroy()
  }

}