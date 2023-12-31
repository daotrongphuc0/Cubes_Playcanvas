import { Entity, StandardMaterial, Vec2, Vec3 } from "playcanvas";
import { GameConstant } from "../GameConstant";
import { AssetsLoader } from "../assets/AssetsLoader";
import assetsData from "../../assets/json/assetsData.json";
import { BoxCollider } from "../physics/scripts/boxCollider";
import { CollisionTag } from "../physics/collisionTag";


export class Item extends Entity {
    constructor(type = 0) {
        super()

        this.type = assetsData[type].key
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
        this.setLocalPosition(0, 0.1, 0)
        this.setLocalEulerAngles(0, -90, 0)
        this.collider = this.addScript(BoxCollider, {
            scale: new pc.Vec3(GameConstant.SIZE_ITEM / 2, GameConstant.DEFAULT_HEIGHT_WALL / 2, GameConstant.SIZE_ITEM / 2),
            tag: CollisionTag.Item
        });
    }

    reloadItem(type = 0) {
        this.material.diffuseMap = AssetsLoader.getAssetByKey(assetsData[type].key).resource
        this.type = assetsData[type].key
        this.material.update()
        this.model.meshInstances[0].material = this.material
    }

    destroy() {
        super.destroy()
    }
}