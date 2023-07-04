import { Entity, Vec3 } from "playcanvas";
import { Spawner } from "../scripts/spawner";
import { Cube } from "./cube";
import { Time } from "../systems/time/time";
import { Helper } from "../Helper/Helper";


export const CubeStackManagerEvent = Object.freeze({
  CubeChange: "cubeChanged",
});

export class CubeStackManager extends Entity {

  static positionQueue = [];

  constructor(player, stackSpace = 1) {
    super("cubeStackManager");
    this.player = player;
    this.cubes = [];
    this.stackSpace = stackSpace;
    this.spawner = this.addScript(Spawner, {
      class: Cube,
      poolSize: 10,
      args: [64]
    });
  }

  enqueuePosition(position) {
    CubeStackManager.positionQueue.push({
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

  spawnCube() {
    let cubeAhead;
    let isFirstCube = this.cubes.length === 0;
    if (isFirstCube) {
      cubeAhead = this.player;
    }
    else {
      cubeAhead = this.cubes[this.cubes.length - 1];
    }
    let spawnPos = cubeAhead.getPosition();
    spawnPos.z += this.stackSpace;
    let cube = this.spawner.spawnTo(spawnPos, this);
    this.cubes.push(cube);
    cube.setEulerAngles(cubeAhead.getEulerAngles());
    let delayTime = isFirstCube ? Helper.getScaleByNumber(cube.number) - 0.3 : cubeAhead.mover.delayTime + Helper.getScaleByNumber(cube.number) + 0.005;
    // let delayTime = Helper.getScaleByNumber(cube.number) + 0.1
    console.log(Helper.getScaleByNumber(cube.number));
    delayTime = Math.max(delayTime, 0.3);
    cube.reset(delayTime);
    return cube;
  }
}
