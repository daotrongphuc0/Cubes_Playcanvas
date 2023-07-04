import { Vec3 } from "playcanvas";
import { Cube } from "./cube";
import { PlayerMovement } from "../scripts/playerMove";
import { GameConstant } from "../GameConstant";
import { Helper } from "../Helper/Helper";

export class Player extends Cube {
  constructor(number = 2) {
    super(number);
    this.moved = false;
    this.startPos = new Vec3();
    this.number = number

    this.playerMove = this.addScript(PlayerMovement, {
      speed: GameConstant.PLAYER_SPEED,
    });
    this.setLocalScale(100, 100, 100)

  }

}