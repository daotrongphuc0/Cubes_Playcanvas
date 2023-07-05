import { Vec3 } from "playcanvas";
import { Cube } from "./cube";
import { PlayerMovement } from "../scripts/playerMove";
import { GameConstant } from "../GameConstant";
import { Helper } from "../Helper/Helper";

export class Player extends Cube {
  constructor(name, num) {
    super(num);
    this.moved = false;
    this.startPos = new Vec3();
    this.name = name
    this.playerMove = this.addScript(PlayerMovement, {
      speed: GameConstant.PLAYER_SPEED,
    });
    var scale = Helper.getScaleByNumber(num);
    this.setLocalScale(scale, scale, scale)

  }

}