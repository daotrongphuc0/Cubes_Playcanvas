import { Vec2, Vec3, log } from "playcanvas";
import { Script } from "../../systems/script/script";
import { Time } from "../../systems/time/time";
import { Helper } from "../../Helper/Helper";
import * as pc from "playcanvas"
import { SceneManager } from "../../Scene/SceneManager";
import { GameConstant } from "../../GameConstant";

export const SnakeMove = Script.createScript({
  name: "SnakeMove",
  attributes: {
    speed: { default: 1 },
  },

  _tmpPos: new Vec3(),
  vector: new Vec3(1, 0, 0),
  vectorDisable: new Vec3(0, 0, 0),
  snakeColliston: null,

  update() {
    this.calTimeSpeedUp()
    var direction = this.vector
    var xMovement = direction.x * this.speed * Time.dt;
    var zMovement = direction.z * this.speed * Time.dt;
    this.rotate(direction);
    this._tmpPos.copy(this.entity.getPosition());
    this._tmpPos.x += xMovement;
    this._tmpPos.z += zMovement;
    for (var i = 0; i < SceneManager.currentScene.wall.length; i++) {
      if (SceneManager.currentScene.wall[i].orientedBox.containsPoint(this._tmpPos)) {
        this._tmpPos.x -= xMovement;
        if (SceneManager.currentScene.wall[i].orientedBox.containsPoint(this._tmpPos)) {
          this._tmpPos.x += xMovement;
        } else {
          xMovement = 0
          continue;
        }
        this._tmpPos.z -= zMovement;
        if (SceneManager.currentScene.wall[i].orientedBox.containsPoint(this._tmpPos)) {
          this._tmpPos.z += zMovement;
        } else {
          zMovement = 0
          continue;
        }
        this._tmpPos.x -= xMovement;
        this._tmpPos.z -= zMovement;
        xMovement = 0;
        zMovement = 0;
        break;
      }
    }
    this.entity.setPosition(this.checkCollistionSnake(this._tmpPos, xMovement, zMovement));
  },

  checkCollistionSnake(pos, xMovement, zMovement) {
    if (!this.snakeColliston) {
      return pos;
    }

    var distance = Helper.getDistance3D(this.entity.getPosition(), this.snakeColliston.getLocalPosition());
    if (distance < Helper.getDistance3D(pos, this.snakeColliston.getLocalPosition())) {
      return pos
    } else {
      pos.x -= xMovement
      pos.z -= zMovement
      return pos
    }
  },

  rotate(direction) {
    let rot = this.entity.getRotation();
    let angle = Math.atan2(direction.x, direction.z);
    angle = angle * 180 / Math.PI;
    this.entity.setEulerAngles(rot.x, angle - 90, rot.z);
  },

  setSnakeCollis(snake) {
    this.snakeColliston = snake;
  },

  removeSnakeCollis() {
    this.snakeColliston = null;
  },

  setVector(vec) {
    this.vector = new Vec3().copy(vec)
  },

  getVector() {
    return this.vector
  },
  setSpeed(speed) {
    this.speed = speed
  },

  calTimeSpeedUp() {
    if (!this.entity.eatItemSpeedUp) {
      if (this.entity.speedUp) {
        this.entity.timeSpeedUp -= Time.dt
        if (this.entity.timeSpeedUp < 0) {
          this.entity.timeSpeedUp = 0
          this.entity.setSpeedReduce(GameConstant.PLAYER_SPEED)
        }
      }
    }
    if (!this.entity.speedUp || this.entity.eatItemSpeedUp) {
      this.entity.timeSpeedUp += Time.dt / 2
      this.entity.timeSpeedUp = Math.min(this.entity.timeSpeedUp, GameConstant.TIME_SPEED_UP)
    }
  }

});
