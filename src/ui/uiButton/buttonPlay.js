import { Vec4, Entity } from "playcanvas";
import { AssetsLoader } from "../../assets/AssetsLoader";

export class ButtonPlay extends Entity {
    constructor(data = {}) {
        super("button");

        data.type = "image";
        data.margin = data.margin || new Vec4();
        data.width = data.width || 150;
        data.height = data.height || 150;
        data.useInput = true;
        data.textureAsset = AssetsLoader.getAssetByKey("bt_continue");
        this.addComponent("element", data);
        this.element.opacity = 1;

    }
}
