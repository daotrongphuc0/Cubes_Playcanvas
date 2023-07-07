import { Vec3 } from "playcanvas";
import { Cube } from "./cube";
import { PlayerMovement } from "../scripts/playerMove";
import { GameConstant } from "../GameConstant";
import { Helper } from "../Helper/Helper";
import { SnakeMove } from "../scripts/snakeMove";
import { TestMove } from "../scripts/testmove";

export class Snake extends Cube {
    constructor(name, num) {
        super(num);
        this.moved = false;
        this.startPos = new Vec3();
        this.name = name;
        var scale = Helper.getScaleByNumber(num);
        this.setLocalScale(scale, scale, scale)
        this.move = this.addScript(SnakeMove, {
            speed: GameConstant.PLAYER_SPEED,
        })

    }

}