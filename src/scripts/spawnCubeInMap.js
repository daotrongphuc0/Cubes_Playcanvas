import { update } from "@tweenjs/tween.js";
import { Script } from "../systems/script/script";
import { Spawner } from "./spawner";



export const SpawmCubeInMap = Script.createScript({
    name: "spawncubeinmap",
    attributes: {
        count: { default: 10 },
    },
    spawns() {
        for (var i = this.entity.cubes.length; i < this.count; i++) {
            this.spawn()
        }
    },
    spawn() {

    }
})