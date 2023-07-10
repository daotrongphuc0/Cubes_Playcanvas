import { Entity, Vec3 } from "playcanvas";
import { Spawner } from "../scripts/spawner";
import { Cube } from "./cube";
import { Time } from "../systems/time/time";
import { Helper } from "../Helper/Helper";


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
      poolSize: 0,
      args: 16
    });
  }

  enqueuePosition(position) {
    this.positionQueue.push({
      position,
      time: Time.current,
    });
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
    this.spawner.args = num
    let cubeAhead;
    let isFirstCube = this.cubes.length === 0 || num > this.cubes[0].number;
    var i = 0;
    if (isFirstCube) {
      cubeAhead = this.player;
      i = 1
    }
    else {
      while (i < this.cubes.length && this.cubes[i].number >= num) {
        i++;
      }
      // this.cubes.splice(i, 0, cube);
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
    let delayTime = isFirstCube ? 0.1 : cubeAhead.mover.delayTime + 0.1;
    delayTime = Math.max(delayTime, 0.3);
    cube.reset(delayTime);

    for (i; i < this.cubes.length; i++) {
      this.cubes[i].reset(delayTime + Helper.getScaleByNumber(this.cubes[i].number) + 0.005)
      delayTime += Helper.getScaleByNumber(this.cubes[i].number) + 0.005
    }
    return cube;
  }
}
