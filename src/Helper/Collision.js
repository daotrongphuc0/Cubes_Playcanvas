import { Vec3 } from "playcanvas";
import { Helper } from "./Helper";


export class Collision {
    static checkColistion(obj1, obj2) {
        var loc1 = obj1.getLocalLocation()
        var loc2 = obj2.getLocalLocation()
        var angle1 = obj1.getLocalEulerAngles()
        if (obj2.type == 1) {
            var vec2 = new Vec3(1, 0, 0)
        } else {
            var vec2 = new Vec3(1, 0, 0)
        }
    }
}