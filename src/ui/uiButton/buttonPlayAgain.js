import { Vec3, Color, Vec2, Vec4, Entity, ELEMENTTYPE_IMAGE, ELEMENTTYPE_TEXT } from "playcanvas"
import { AssetsLoader } from "../../assets/AssetsLoader";
import { Util } from "../../Helper/util";


export class ButtonPlayAgain extends Entity {
  constructor(data = {}) {
    super("button");
    data.type = ELEMENTTYPE_IMAGE;
    data.margin = data.margin || new Vec4();
    data.width = data.width || 100;
    data.height = data.height || 50;
    data.useInput = true;
    data.textureAsset = AssetsLoader.getAssetByKey("bt_play");
    this.addComponent("element", data);

    this.addComponent("button", {
      imageEntity: this,
      hoverTint: Util.createColor(255, 255, 255),
      pressedTint: Util.createColor(160, 160, 160),
    });

    this._initText();
  }

  _initText() {
    this.text = new Entity("text");
    let font = AssetsLoader.getAssetByKey("CanvasFont");
    this.text.addComponent("element", {
      text: " Play again ",
      fontAsset: font,
      fontSize: 28,
      type: ELEMENTTYPE_TEXT,
      color: new Color(0, 0, 0),
      pivot: new Vec2(0.5, 0.5),
      alignment: new Vec2(0.5, 0.5),
      anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
      margin: new Vec4(),
    });
    this.addChild(this.text);
  }
}
