import { Vec3 } from "playcanvas";
import { PlayerMovement } from "../script/playerMove.js";
import { GameConstant } from "../GameConstant.js";
import { Cube } from "./cube.js";

export class Player extends Cube {
  constructor() {
    super(2048);
    this.moved = false;
    this.startPos = new Vec3();

    this.playerMove = this.addScript(PlayerMovement, {
      speed: GameConstant.PLAYER_SPEED,
    });

  }
}