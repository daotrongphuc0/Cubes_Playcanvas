import { Vec3 } from "playcanvas";
import { Script } from "../../systems/script/script";
import { Helper } from "../../Helper/Helper";
import { Time } from "../../systems/time/time";


export const MoveDueToColis = Script.createScript({
    name: "moveduetocollisition",
    attributes: {
        objCollistion: { default: null }
    },

    update() {
        if (this.objCollistion) {
            var tmp_pos = this.entity.getLocalPosition()
            var vector = Helper.getVectorAngle(this.objCollistion.getLocalPosition(), tmp_pos)
            tmp_pos.x += vector.x * this.objCollistion.move.speed * Time.dt
            tmp_pos.z += vector.z * this.objCollistion.move.speed * Time.dt
            this.entity.setLocalPosition(tmp_pos.x, tmp_pos.y, tmp_pos.z)
        }
    }
})