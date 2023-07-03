import { Vec3 } from "playcanvas";
import { Time } from "../systems/time/time";
import { Script } from "./script";
import { Box } from "../Object/Box";


export const PlayerMove = Script.createScript({
    name: "player_move",
    attributes: {
        speed: { default: 0 },
        enable: { default: false },
    },

    _tmpPos: new Vec3(),


    onEnable() {
        this.enable = true;
    },

    offEnable() {
        this.startPos = false;
    },

    update() {
        if (!this.enable) {
            return;
        }
        var xMovement = this.entity.direction_vector.x * this.speed * Time.dt;
        // console.log(Time.dt);
        var zMovement = this.entity.direction_vector.z * this.speed * Time.dt;
        this.rotate(this.entity.direction_vector);
        this._tmpPos.copy(this.entity.getLocalPosition());
        this._tmpPos.x += xMovement;
        this._tmpPos.z += zMovement;
        this.entity.setLocalPosition(this._tmpPos);

        this.entity.travel_history.push(this.entity.getLocalPosition())

        if (Time.time_game / 5 > this.entity.tail.length) {
            var box = new Box()
            this.entity.scene.addChild(box)
            this.entity.tail.push(box)
            // console.log(this.entity.tail[0]);
            // console.log(this.entity);
            console.log("create box");
        }

        // console.log(this.entity.getLocalPosition());

        // console.log(this.entity.travel_history.position_past);

        this.entity.travel_history.getByDelayTime(this.entity.tail)
        // console.log(this.entity.getLocalPosition() + " ----- ");
        // console.log(this.entity.travel_history.position_past);
    },
    rotate(direction) {
        let rot = this.entity.getRotation();
        let angle = Math.atan2(direction.x, direction.z);
        angle = angle * 180 / Math.PI;
        this.entity.setEulerAngles(rot.x, angle - 90, rot.z);
    },


})