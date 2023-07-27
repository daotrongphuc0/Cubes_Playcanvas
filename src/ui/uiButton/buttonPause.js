import { Vec4, Entity } from "playcanvas";
import { AssetsLoader } from "../../assets/AssetsLoader";

export class ButtonPause extends Entity {
    constructor(data = {}) {
        super("button");

        data.type = "image";
        data.margin = data.margin || new Vec4();
        data.width = data.width || 50;
        data.height = data.height || 50;
        data.useInput = true;
        data.textureAsset = AssetsLoader.getAssetByKey("bt_pause");
        this.addComponent("element", data);
        this.element.opacity = 1;

    }
}
