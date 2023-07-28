import { Color, Entity, OrientedBox, StandardMaterial, Vec2, Vec3, Mat4 } from "playcanvas";
import { GameConstant } from "../GameConstant";
import { BoxCollider } from "../physics/scripts/boxCollider";
import { CollisionTag } from "../physics/collisionTag";

export class Wall extends Entity {
    constructor(pos = new Vec3(), size = new Vec2()) {
        super("wall")

        this.material = new StandardMaterial();
        this.material.diffuse = GameConstant.DEFAULT_COLOR_WALL
        this.material.update()
        this.addComponent("model", { type: "box", material: this.material });
        this.setLocalPosition(pos)
        this.setLocalScale(size.x, GameConstant.DEFAULT_HEIGHT_WALL, size.y)

        this.orientedBox = new OrientedBox(this.getWorldTransform());
        const expandAmount = 0.045;
        this.orientedBox.halfExtents.x += expandAmount;
        this.orientedBox.halfExtents.z += expandAmount;
        this.collider = this.addScript(BoxCollider, {
            scale: new Vec3(size.x / 2, GameConstant.DEFAULT_HEIGHT_WALL / 2, size.y / 2),
            tag: CollisionTag.Wall
        });
    }

    destroy() {
        super.destroy()
    }
}
