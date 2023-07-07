import { Entity, StandardMaterial, Vec2 } from "playcanvas";
import { GameConstant } from "../GameConstant";
import { AssetsLoader } from "../assets/AssetsLoader";
import assetsData from "../../assets/json/assetsData.json";


export class Item extends Entity {
    constructor(type = 0) {
        super()

        this.type = 1
        this.material = new pc.StandardMaterial()
        this.material.diffuseMap = AssetsLoader.getAssetByKey(assetsData[type].key).resource
        this.material.diffuseTint = true
        this.material.diffuseMapTiling = new pc.Vec2(1, 1);
        this.material.update()


        this.addComponent("model", {
            type: "plane",
            material: this.material,
        });
        this.setLocalScale(GameConstant.SIZE_ITEM, 0, GameConstant.SIZE_ITEM)
        this.setLocalPosition(0, 0.01, 0)
        this.setLocalEulerAngles(0, -90, 0)
    }
}