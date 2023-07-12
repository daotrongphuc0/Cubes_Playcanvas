import * as pc from "playcanvas";
import { AssetsLoader } from "../assets/AssetsLoader";

export class Background extends pc.Entity {
    constructor(x = 20, y = 20) {
        super("background")

        this.material = new pc.StandardMaterial()
        this.material.diffuse = new pc.Color(31 / 255, 54 / 255, 97 / 255)
        this.material.diffuseMap = AssetsLoader.getAssetByKey("dotmap").resource
        this.material.diffuseMapTiling = new pc.Vec2(x / 2, y / 2);
        this.material.update()

        this.addComponent("model", {
            type: "plane",
            material: this.material,
        });
        this.setLocalScale(x, 0, y)
        this.setLocalPosition(0, 0, 0)
        this.setLocalEulerAngles(0, 0, 0)
    }
}