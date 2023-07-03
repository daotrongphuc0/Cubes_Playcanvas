import { Vec3 } from "playcanvas";

import { Cube } from "./cube.js";
import { Time } from "../systems/time/time.js";
import { PlayerMove } from "../script/update_move.js";
import { GameConstant } from "../GameConstant.js";
import { TravelHistory } from "./TravelHistory.js";
import { Box } from "./Box.js";
import { Helper } from "../Helper/Helper.js";

export class Player extends Cube {
  constructor(number = 2048, scene = null) {
    super(number);
    this.scene = scene;
    this._tmpPos = new Vec3();
    this.direction_vector = new Vec3(0, 0, 1)

    this.travel_history = new TravelHistory(this);
    this.tail = []
    this.speed = GameConstant.PLAYER_SPEED

    var scale = Helper.getScaleByNumber(number)
    this.setLocalScale(scale, scale, scale)

    // this.script_player = this.addScript(PlayerMove, {
    //   speed: GameConstant.PLAYER_SPEED,
    // })

  }

  update(dt) {
    var xMovement = this.direction_vector.x * this.speed * dt;
    var zMovement = this.direction_vector.z * this.speed * dt;
    this.rotate(this.direction_vector);
    this._tmpPos.copy(this.getLocalPosition());
    this._tmpPos.x += xMovement;
    this._tmpPos.z += zMovement;
    this.setLocalPosition(this._tmpPos);
    this.travel_history.push_posi(this.getLocalPosition())
    console.log(this.getLocalPosition());

    if (Time.time_game / 5 > this.tail.length) {
      var box = new Box()
      this.scene.addChild(box)
      this.tail.push(box)
      console.log("create box");
      console.log(this.travel_history.position_past);
    }

    this.travel_history.getByDelayTime(this.tail)

  }

  rotate(direction) {
    let rot = this.getRotation();
    let angle = Math.atan2(direction.x, direction.z);
    angle = angle * 180 / Math.PI;
    this.setEulerAngles(rot.x, angle - 90, rot.z);
  }

  set_direction_vector(vector) {
    this.direction_vector = vector;
  }

}