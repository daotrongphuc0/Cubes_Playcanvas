import { Vec2, Vec3, log } from "playcanvas";
import { Script } from "../systems/script/script";
import { Time } from "../systems/time/time";
import { Helper } from "../Helper/Helper";

export const SnakeMove = Script.createScript({
    name: "SnakeMove",
    attributes: {
        speed: { default: 1 },
    },

    _tmpPos: new Vec3(),
    vector: new Vec3(0, 0, 1),

    update() {
        var direction = this.vector
        var xMovement = direction.x * this.speed * Time.dt;
        var zMovement = direction.z * this.speed * Time.dt;
        this.rotate(direction);
        this._tmpPos.copy(this.entity.getPosition());
        this._tmpPos.x += xMovement;
        this._tmpPos.z += zMovement;
        this.entity.setPosition(this._tmpPos);
    },

    rotate(direction) {
        let rot = this.entity.getRotation();
        let angle = Math.atan2(direction.x, direction.z);
        angle = angle * 180 / Math.PI;
        this.entity.setEulerAngles(rot.x, angle - 90, rot.z);
    },

    setVector(vec) {
        this.vector = vec;
    },

});
