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
        // console.log(i);
        // return GameConstant.DEFAULT_SCALE_BOX_MAX * (1 - (1 / i))
        // return GameConstant.DEFAULT_SCALE_BOX_MIN + (Math.log(i) / 1.5) * (GameConstant.DEFAULT_SCALE_BOX_MIN)
        return GameConstant.DEFAULT_SCALE_BOX_MIN + (Math.log(i) / 3.5) * (GameConstant.DEFAULT_SCALE_BOX_MAX - GameConstant.DEFAULT_SCALE_BOX_MIN)
    }

    static getColorByNumber(number) {
        var i = Math.log2(number)
        // var i = number
        var red = (i * 31) % 256;
        var green = (i * 31) % 150;
        var blue = (i * 71) % 256;
        return new pc.Color(1 - (red / 255), 1 - (green / 255), 1 - (blue / 255));
    }

    static getStringByNumber(number) {
        if (number < 10000) {
            return number + ""
        }
        if (number >= 10000 && number < 1000000) {
            return Math.floor(number / 1000) + "K"
        }
        if (number >= 1000000 && number < 1000000000) {
            return Math.floor(number / 1000000) + "M"
        }
        if (number >= 1000000000) {
            return Math.floor(number / 1000000000) + "B"
        }
    }


}