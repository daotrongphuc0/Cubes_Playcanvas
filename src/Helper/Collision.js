import { Vec3 } from "playcanvas";
import { Helper } from "./Helper";
import { GameConstant } from "../GameConstant";


export class Collision {
    static checkColistionBox(obj1, obj2) {
        var loc1 = obj1.getLocalPosition()
        var loc2 = obj2.getLocalPosition()
        var vectorObject1 = obj1.move.getVector()
        var vectorObject2 = obj2.move.getVector()
        var vector = loc2.clone().sub(loc1).normalize()

        var dis = Helper.getDistance3D(loc1, loc2)

        var angleObj1 = Helper.getAngleTwoVector(vector, vectorObject1)
        var angleObj2 = Helper.getAngleTwoVector(vector, vectorObject2)

        // console.log(Math.cos(angleObj1 >= Math.PI / 2 ? Math.PI - angleObj1 : angleObj1));

        var disObj1 = 0.5 * Helper.getScaleByNumber(obj1.number) * GameConstant.SIZE_MODEL_BOX / Math.cos(angleObj1 >= Math.PI / 2 ? Math.PI - angleObj1 : angleObj1)
        var disObj2 = 0.5 * Helper.getScaleByNumber(obj2.number) * GameConstant.SIZE_MODEL_BOX / Math.cos(angleObj2 >= Math.PI / 2 ? Math.PI - angleObj2 : angleObj2)
        // console.log(Helper.getScaleByNumber(obj2.number) + Helper.getScaleByNumber(obj1.number))
        // console.log(dis);
        // console.log(disObj1);
        // console.log(disObj2);
        return dis < Math.abs(disObj1) + Math.abs(disObj2)
    }

    static checkColistionWall(obj1, wall) {

    }
}