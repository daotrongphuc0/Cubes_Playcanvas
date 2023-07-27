import { Vec4, Entity } from "playcanvas";
import { AssetsLoader } from "../../assets/AssetsLoader";

export class ButtonSpeed extends Entity {
  constructor(data = {}) {
    super("button");

    data.type = "image";
    data.margin = data.margin || new Vec4();
    data.width = data.width || 100;
    data.height = data.height || 100;
    data.useInput = true;
    data.textureAsset = AssetsLoader.getAssetByKey("bt_speed");
    this.addComponent("element", data);
    this.element.opacity = 0.7;
  }
}
