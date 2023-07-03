import * as pc from "playcanvas";
import { AssetsLoader } from "../assets/AssetsLoader";

export class Background extends pc.Entity {
    constructor() {
        super("background")

        this.material = new pc.StandardMaterial()
        this.material.diffuse = new pc.Color(31 / 255, 54 / 255, 97 / 255)
        this.material.diffuseMap = AssetsLoader.getAssetByKey("dotmap").resource
        this.material.diffuseDetailMapTiling.set(new pc.Vec2(30, 30))
        this.material.update()
        // console.log(this.material)

        this.addComponent("model", {
            type: "plane",
            material: this.material,
        });
        this.setLocalScale(50, 0, 50)
        this.setLocalPosition(0, 0, 0)
        this.setLocalEulerAngles(0, 0, 0)
    }
}