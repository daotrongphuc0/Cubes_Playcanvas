import { Color, Entity, StandardMaterial, Vec3 } from "playcanvas";
import { GameConstant } from "../GameConstant";
import { AssetsLoader } from "../assets/AssetsLoader";


export class Wall extends Entity {
    constructor(pos = new Vec3, size = new Vec2) {
        super()
        this.material = new StandardMaterial();
        this.material.diffuse = GameConstant.DEFAULT_COLOR_WALL
        this.material.update()
        // this.modelAsset = AssetsLoader.getAssetByKey("box")
        this.addComponent("model", { type: "box", material: this.material });
        this.setLocalPosition(pos)
        this.setLocalScale(size.x, GameConstant.DEFAULT_HEIGHT_WALL, size.y)

        // this.addComponent("rigidbody", {
        //     type: "static",
        //     mass: 0,
        //     restitution: 0.5,
        // });

        // this.addComponent('collision', {
        //     type: 'box',
        //     halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
        // });
    }
}