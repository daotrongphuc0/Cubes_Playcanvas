import { Vec2, Vec3, log } from "playcanvas";
import { Script } from "../systems/script/script";
import { Time } from "../systems/time/time";

export const TestMove = Script.createScript({
    name: "TestMove",
    attributes: {
        speed: { default: 1 },
        vector: { default: new Vec3(0, 0, 1) },
    },
    update() {
        // Xoay đối tượng theo hướng di chuyển
        this.rotate(this.vector);

        this.entity.rigidbody.linearVelocity = new Vec3().copy(this.vector).normalize().scale(this.speed);
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

    getVector() {
        return this.vector
    },

});
