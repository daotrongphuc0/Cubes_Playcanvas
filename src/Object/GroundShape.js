import { Entity, Vec3, BoundingBox, StandardMaterial, ModelComponent, Vec2 } from "playcanvas";
import { AssetsLoader } from "../assets/AssetsLoader";
import * as pc from "playcanvas"

export class GroundShape extends Entity {
    constructor() {
        super();

        // Tạo hình hộp đại diện cho mặt đất
        this.groundShape = new BoundingBox(new Vec3(0, -0.001, 0), new Vec3(50, 0.001, 50));
        this.setLocalScale(50, 0.001, 50)
        // Tạo thành phần đồ họa cho mặt đất
        this.modelComponent = this.addComponent("model", {
            type: "box",
            model: this.groundShape,
        });

        // Tạo vật liệu đơn giản với màu sắc
        this.material = new pc.StandardMaterial()
        this.material.diffuse = new pc.Color(31 / 255, 54 / 255, 97 / 255)
        this.material.diffuseMap = AssetsLoader.getAssetByKey("dotmap").resource
        this.material.diffuseTint = true
        this.material.tint = new pc.Color(0.5, 0.5)
        this.material.diffuseMapTiling = new Vec2(40, 40);
        this.material.update();
        this.modelComponent.model.meshInstances[0].material = this.material
    }
}

