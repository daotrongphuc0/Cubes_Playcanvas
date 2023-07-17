import { update } from "@tweenjs/tween.js";
import { Script } from "../systems/script/script";
import { Spawner } from "./spawner";
import { Helper } from "../Helper/Helper";
import data from "../../assets/json/datalv1.json";
import { Cube } from "../Object/cube";
import { Scene } from "playcanvas";
import { SceneManager } from "../Scene/SceneManager";




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
        var x = Helper.randomFloor(0, data.background.size[0])
        var y = Helper.randomFloor(0, data.background.size[0])
        var num = Helper.randomFloor(0, 4)
        var cube = new Cube(num)
        cube.setLocalPosition(x, 0, y)
        SceneManager.currentScene.addChild(cube)
        SceneManager.currentScene.cubes.push(cube)
        if (!cube.enable) {
            SceneManager.currentScene.removeChild(cube)
            cube.destroy()
            SceneManager.currentScene.cubes.pop()
            this.spawn()
        }

        // cube.on('collisionstart', (result) => {
        //     console.log("check ok");
        // })

    }
})