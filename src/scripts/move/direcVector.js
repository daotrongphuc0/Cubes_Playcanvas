import { Scene, Vec3 } from "playcanvas";
import { Helper } from "../../Helper/Helper";
import { Script } from "../../systems/script/script";
import { Time } from "../../systems/time/time";
import { SceneManager } from "../../Scene/SceneManager";
import { GameConstant } from "../../GameConstant";



export const DirecVector = Script.createScript({
  name: "direcvector",
  attributes: {
    timeStepRandom: { default: 5 },
    intelligent: { default: 1 },
    timeUpdated: { default: 0 },
    speed: { default: 2 },
  },
  reverse: false,
  timeAI: 0,
  stepTimeAI: 2,
  targetVector: new Vec3(),
  interpolation: new Vec3(),
  snakeTarget: null,
  regime: 1,  // 1 : attack ; 0: run away


  update(dt) {
    if (this.snakeTarget) {
      this.findSnakeTarget()
    }
    if (this.timeAI + this.stepTimeAI <= Time.get_timeGame()) {
      if (this.snakeTarget) {
        if (Math.random() < 0.7) {
          this.findBait()
        }
        else {
          this.targetVector = this.getRandomVector()
          this.timeAI = Time.get_timeGame()
          this.stepTimeAI = 4
        }
        this.snakeTarget = null
      }
      else {
        this.findSnakeTarget()
        this.timeAI = Time.get_timeGame()
        this.stepTimeAI = 5
      }
    }
    this.interpolation.lerp(this.entity.move.getVector(), this.targetVector, this.speed * Time.dt);
    this.entity.move.setVector(this.interpolation.normalize())
  },

  getRandomVector() {
    var vector = new Vec3().copy(this.entity.move.getVector())
    var angle = Math.atan2(vector.x, vector.z);
    angle = (angle * Math.PI) / 180
    var tmp = Helper.randomFloor(0, 360)
    if (tmp >= 150 && tmp <= 210) {
      tmp -= 180
    }
    angle += tmp
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return new pc.Vec3(x, 0, y);
  },

  reverseDirection() {
    if (!this.reverse) {
      this.reverse = true
      var vector = new Vec3().copy(this.entity.move.getVector())
      var angle = Math.atan2(vector.x, vector.z);
      angle = (angle * Math.PI) / 180
      var tmp = Helper.randomFloor(110, 250)
      angle += tmp
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      this.targetVector = new pc.Vec3(x, 0, y);
      this.speed = 6
      setTimeout(() => {
        this.speed = 2
        this.reverse = false
      }, 2000)
      this.snakeTarget = null
      this.timeAI = Time.get_timeGame()
      this.stepTimeAI = 3    // sau 2s 
    }
  },

  findSnakeTarget() {
    var distanceMin = 10000000;

    for (var i = 0; i < SceneManager.currentScene.snakes.length; i++) {
      if (this.entity === SceneManager.currentScene.snakes[i]) {
        continue;
      }

      var distance = Helper.getDistance3D(this.entity.getLocalPosition(), SceneManager.currentScene.snakes[i].getLocalPosition())
      if (distance < GameConstant.DISTANCE_SNAKE_REGIME && distance < distanceMin) {
        distanceMin = distance;
        this.snakeTarget = SceneManager.currentScene.snakes[i];
        if (this.snakeTarget.number >= this.entity.number) {
          this.regime = 0;
        }
        else {
          this.regime = 1;
        }
      }
    }

    if (distanceMin > GameConstant.DISTANCE_SNAKE_REGIME) {
      this.snakeTarget = null
      if (Math.random() < 0.7) {
        this.findBait()
      }
      else {
        this.targetVector = this.getRandomVector()
      }
      this.timeAI = Time.get_timeGame()
      this.stepTimeAI = 2
      this.entity.activeDeceleration(GameConstant.PLAYER_SPEED)
    }
    else {
      if (this.entity.timeSpeedUp >= 2) {
        this.entity.activeAcceleration(GameConstant.PLAYER_SPEED_UP)
      }
      this.getVectorBySnakeTarget()
    }
  },

  findBait() {
    var distanceMin = 10000000;
    for (var i = 0; i < SceneManager.currentScene.cubes.length; i++) {
      if (SceneManager.currentScene.cubes[i].manager || SceneManager.currentScene.cubes[i].number > this.entity.number) {
        continue;
      }

      var distance = Helper.getDistance3D(this.entity.getLocalPosition(), SceneManager.currentScene.cubes[i].getLocalPosition())
      if (distance < 8 && distance < distanceMin) {
        this.targetVector = Helper.getVectorAngle(this.entity.getLocalPosition(), SceneManager.currentScene.cubes[i].getLocalPosition())
        this.timeAI = Time.get_timeGame()
        this.stepTimeAI = 3
        return;
      }
    }
  },

  getVectorBySnakeTarget() {
    if (this.regime === 1) {
      this.targetVector = Helper.getVectorAngle(this.entity.getLocalPosition(), this.snakeTarget.getLocalPosition())
    }
    else {
      this.targetVector = Helper.sumTwoVector(Helper.getVectorAngle(this.snakeTarget.getLocalPosition(), this.entity.getLocalPosition()),
        this.getRandomVector())
    }
    this.timeregime = Time.get_timeGame()
  }
}) 