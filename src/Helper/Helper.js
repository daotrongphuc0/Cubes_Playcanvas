import { GameConstant } from "../GameConstant";
import * as pc from "playcanvas";

export class Helper {
    static randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomFloor(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static getIncreaseX(increase, radian) {
        return Math.cos(radian) * increase
    }

    static getIncreaseY(increase, radian) {
        return Math.sin(radian) * increase
    }

    static getScaleByNumber(number) {
        var i = Math.log2(number)
        return GameConstant.DEFAULT_SCALE_BOX_MIN +
            (GameConstant.DEFAULT_SCALE_BOX_MAX - GameConstant.DEFAULT_SCALE_BOX_MIN) / ((1 / (GameConstant.DEFAULT_SCALE_SIZE_INCREASE * i)) + 1)
    }

    static getColorByNumber(number) {
        var i = Math.log2(number)
        // var i = number
        var red = (i * 31) % 256;
        var green = (i * 31) % 150;
        var blue = (i * 71) % 256;
        return new pc.Color(1 - (red / 255), 1 - (green / 255), 1 - (blue / 255));
    }
}