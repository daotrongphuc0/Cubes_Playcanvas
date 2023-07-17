import { Vec3 } from "playcanvas";
import { Script } from "../systems/script/script";


export const MoveDueToColis = Script.createScript({
    name: "moveduetocollisition",
    attributes: {
        objCollistion: { default: null }
    },

    update() {
        if (this.objCollistion) {

        }
    }



})