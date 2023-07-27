import { Vec3, Color, Vec2, Vec4, Entity, ELEMENTTYPE_IMAGE, ELEMENTTYPE_TEXT } from "playcanvas"
import { AssetsLoader } from "../../assets/AssetsLoader";
import { Util } from "../../Helper/util";


export class TextFrame extends Entity {
    constructor(data = {}) {
        super("button");
        let font = AssetsLoader.getAssetByKey("CanvasFont");
        data.type = ELEMENTTYPE_TEXT;
        data.margin = data.margin || new Vec4();
        data.useInput = true;
        data.fontAsset = font;
        data.fontSize = data.fontSize || 20;
        data.color = data.color || new Color(1, 1, 1);
        data.alignment = data.alignment || new Vec2(0.5, 0.5);
        this.addComponent("element", data);

    }
}
