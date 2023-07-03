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
        return GameConstant.DEFAULT_SCALE_BOX_MIN + (Math.log(i) / 3.5) * (GameConstant.DEFAULT_SCALE_BOX_MAX - GameConstant.DEFAULT_SCALE_BOX_MIN)
    }

    static getColorByNumber(number) {
        var i = Math.log2(number)
        var red = (i * 31) % 256;
        var green = (i * 31) % 150;
        var blue = (i * 71) % 256;
        return new pc.Color(1 - (red / 255), 1 - (green / 255), 1 - (blue / 255));
    }

    static getStringByNumber(num) {
        if (num >= 1000000000) {
            return `${Math.floor(num / 1000000000)}B`;
        }
        if (num >= 1000000) {
            return `${Math.floor(num / 1000000)}M`;
        }
        if (num >= 10000) {
            return `${Math.floor(num / 1000)}K`;
        }
        return num;
    }

    static getAngle(x1, y1, x2, y2) {
        const deltaY = y2 - y1;
        const deltaX = x2 - x1;
        const angleInRadians = Math.atan2(deltaY, deltaX);
        return angleInRadians;
    }

    static getVectorAngle(vec1, vec2) {
        return vec2.clone().sub(vec1).normalize();;
    }

    static getDistance(x1, y1, x2, y2) {
        return (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y1 - y2, 2)))
    }

    static getDistance3D(start, end) {
        return (Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2) + Math.pow(start.z - end.z, 2)))
    }

    static toAngleDegree(pi) {
        return pi * 180 / Math.PI
    }


}