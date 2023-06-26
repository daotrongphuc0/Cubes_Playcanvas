import { Entity, StandardMaterial, Color } from "playcanvas";
import { AssetsLoader } from "../assets/AssetsLoader";

export class Box extends Entity {
    constructor(name = null, number = 2) {
        super(name);

        // create material
        this.material = new StandardMaterial();
        this.material.diffuse.set(0.8, 0.5, 0.5);
        this.material.update()


        this.number = number;
        this.nextBox = null;

        this.modelAsset = AssetsLoader.getAssetByKey("box")
        this.boxModel = new Entity()
        this.boxModel.addComponent("model", { asset: this.modelAsset, material: this.material });
        this.boxModel.setLocalPosition(0, 0.5, 0)
        this.boxModel.setLocalEulerAngles(0, 0, 0)
        this.addChild(this.boxModel);
    }
}
