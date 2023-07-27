import { Entity, Vec4 } from "playcanvas";
import { AssetsLoader } from "../../assets/AssetsLoader";
export class BgButtonMove extends Entity {
    constructor(data = {}) {
        super("button");
        data.type = "image";
        data.margin = data.margin || new Vec4();
        data.width = data.width || 180;
        data.height = data.height || 180;
        data.useInput = true;
        data.textureAsset = AssetsLoader.getAssetByKey("bg_move");
        this.addComponent("element", data);
        this.element.opacity = 0.5;
    }
}
