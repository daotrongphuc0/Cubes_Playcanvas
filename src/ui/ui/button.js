import { Vec3, Color, Vec2, Vec4, Entity, ELEMENTTYPE_IMAGE, ELEMENTTYPE_TEXT } from "playcanvas"
import { AssetsLoader } from "../../assets/AssetsLoader";
import { Util } from "../../Helper/util";


export class Button extends Entity {
  constructor(data = {}) {
    super("button");
    data.type = ELEMENTTYPE_IMAGE;
    data.margin = data.margin || new Vec4();
    data.width = data.width || 100;
    data.height = data.height || 50;
    data.useInput = true;
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

    AssetsLoader.createCanvasFont("Arial", 106, "bold");
    let font = AssetsLoader.getAssetByKey("CanvasFont");
    console.log(font);
    this.text.addComponent("element", {
      text: "Restart ",
      fontAsset: font,
      fontSize: 22,
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
