import { Entity, Vec3 } from "playcanvas";
import { Spawner } from "../scripts/spawner";
import { Cube } from "./cube";
import { Time } from "../systems/time/time";
import { Helper } from "../Helper/Helper";
import { GameConstant } from "../GameConstant";
import { CheckUpdateSnake } from "../scripts/checkUpdateSnake";
import { SceneManager } from "../Scene/SceneManager";
import { SpawningEvent } from "../scripts/spawningEvent";


export const CubeStackManagerEvent = Object.freeze({
  CubeChange: "cubeChanged",
});

export class CubeStackManager extends Entity {

  constructor(player, stackSpace = 1) {
    super("cubeStackManager");
    this.player = player;
    this.positionQueue = [];
    this.cubes = [];
    this.stackSpace = stackSpace;
    this.spawner = this.addScript(Spawner, {
      class: Cube,
      poolSize: 10,
      args: 2
    });
    this._checkUpdateSnake = this.addScript(CheckUpdateSnake, {
      timeCheck: 1.5,
      isUpdate: false,
    })
  }

  enqueuePosition(position) {
    this.positionQueue.push({
      position,
      time: Time.current,
    });

    if (this.positionQueue.length > GameConstant.LIMIT_TIME_POS_QUEUE / Time.dt) {
      this.positionQueue.splice(0, this.positionQueue.length - Math.floor(GameConstant.LIMIT_TIME_POS_QUEUE - 5 / Time.dt))
    }
  }

  stopMove() {
    this.cubes.forEach(cube => {
      cube.activeMove(false);
    });
  }

  startMove() {
    this.cubes.forEach(cube => {
      cube.activeMove(true);
    });
  }

  spawnCube(num) {
    if (this.player.speedUp) {
      this.player.setSpeedReduce(GameConstant.PLAYER_SPEED)
      var isPlayerSpeedUp = true
    }
    this.spawner.args = num
    let cubeAhead;
    let isFirstCube = this.cubes.length === 0 || num > this.cubes[0].number;
    var i = 0;
    if (isFirstCube) {
      cubeAhead = this.player;
      i = 1
    }
    else {
      while (i < this.cubes.length && this.cubes[i].number >= num && this.cubes[i]?.number) {
        i++;
      }
      cubeAhead = this.cubes[i - 1];
    }
    let spawnPos = cubeAhead.getPosition();
    spawnPos.z += this.stackSpace;
    let cube = this.spawner.spawnTo(spawnPos, this);

    cube.manager = this;

    if (isFirstCube) {
      this.cubes.splice(0, 0, cube);
    }
    else {
      this.cubes.splice(i, 0, cube);
    }
    cube.setEulerAngles(cubeAhead.getEulerAngles());
    let delayTime = isFirstCube ? Helper.getScaleByNumber(this.cubes[0].number) * 0.1 + Helper.getScaleByNumber(this.player.number) * 0.1 : cubeAhead.mover.delayTime + 0.1;
    cube.reset(delayTime);
    cube.updateChance(num)

    for (i; i < this.cubes.length; i++) {
      this.cubes[i].reset(this.cubes[i - 1].mover.delayTime + Helper.getScaleByNumber(this.cubes[i].number) * 0.2
        + Helper.getScaleByNumber(this.cubes[i - 1].number) * 0.4)
    }
    if (isPlayerSpeedUp) {
      this.player.setSpeedIncrease(GameConstant.PLAYER_SPEED_UP)
    }

    this._checkUpdateSnake.setUpdate(true)
    return cube;
  }

  checkUpdateSnake() {
    if (this.player.speedUp) {
      this.player.setSpeedReduce(GameConstant.PLAYER_SPEED)
      var isPlayerSpeedUp = true
    }
    var isUpdate = false
    var x = 1;
    if (this.cubes[0] && this.player.number === this.cubes[0].number) {
      console.log(this.player.number + " " + this.cubes[0].number);
      this.player.levelUp()
      SceneManager.currentScene.ui.getScreen(GameConstant.SCREEN_PLAY).updateRanking()
      // this.cubes[0].destroy()
      this.cubes[0].fire(SpawningEvent.Despawn)
      this.cubes.splice(0, 1)
      this.cubes[0]?.reset(Helper.getScaleByNumber(this.cubes[0].number) * 0.1
        + Helper.getScaleByNumber(this.player.number) * 0.1)
      for (var i = 1; i < this.cubes.length; i++) {
        this.cubes[i].reset(this.cubes[i - 1].mover.delayTime + Helper.getScaleByNumber(this.cubes[i].number) * 0.4
          + Helper.getScaleByNumber(this.cubes[i - 1].number) * 0.4)
      }
      x += 2
      isUpdate = true
    }
    for (x; x < this.cubes.length; x++) {
      if (this.cubes[x].number === this.cubes[x - 1].number) {
        this.cubes[x - 1].levelUp()
        // this.cubes[x].destroy()
        this.cubes[x].fire(SpawningEvent.Despawn)
        // this.spawner.despawn(this.cubes[x])
        this.cubes.splice(x, 1)

        for (var i = x; i < this.cubes.length; i++) {
          this.cubes[i].reset(this.cubes[i - 1].mover.delayTime + Helper.getScaleByNumber(this.cubes[i].number) / 2 + 0.1)
        }
        // x += 2
        isUpdate = true
        // break;
      }
    }
    if (isPlayerSpeedUp) {
      this.player.setSpeedIncrease(GameConstant.PLAYER_SPEED_UP)
    }
    if (isUpdate) {
      this._checkUpdateSnake.setUpdate(true)
    } else {
      this._checkUpdateSnake.setUpdate(false)
    }
  }

  destroy() {
    super.destroy()
  }
}
