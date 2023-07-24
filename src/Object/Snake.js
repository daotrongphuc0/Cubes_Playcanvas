import { OrientedBox, Vec3 } from "playcanvas";
import { Cube } from "./cube";
import { GameConstant } from "../GameConstant";
import { Helper } from "../Helper/Helper";
import { SnakeMove } from "../scripts/move/snakeMove";
import { Wall } from "./Wall";
import { Item } from "./Item";
import { SceneManager } from "../Scene/SceneManager";
import { MoveDueToColis } from "../scripts/move/MoveDueToColis";
import data from "../../assets/json/datalv1.json";


export class Snake extends Cube {
  constructor(name, num) {
    super(num);
    this.moved = false;
    this.startPos = new Vec3();
    this.name = name;
    var scale = Helper.getScaleByNumber(num);
    this.setLocalScale(scale, scale, scale)

    this.orientedBox = new OrientedBox(this.getWorldTransform());
    const expandAmount = 0.06;
    this.orientedBox.halfExtents.x += expandAmount;
    this.orientedBox.halfExtents.z += expandAmount;


    this.speedUp = false

    this.move = this.addScript(SnakeMove, {
      speed: GameConstant.PLAYER_SPEED,
    })

    this.addComponent("rigidbody", {
      type: "kinematic",
    });

    this.addComponent('collision', {
      type: 'box',
      halfExtents: new pc.Vec3(scale, scale, scale)
    });

    this.collision.on('collisionstart', (result) => {
      var otherEntity = result.other;

      if (otherEntity instanceof Wall) {
        this.reverseDirection()
        return
      }

      if (otherEntity instanceof Item) {
        this.collisionItem(otherEntity)
        return
      }

      if (otherEntity instanceof Snake) {
        this.collisionSnake(otherEntity)
        return;
      }
      if (otherEntity instanceof Cube) {
        this.collisionCube(otherEntity)
        return;
      }
    })

    this.collision.on('collisionend', (result) => {
      if (result instanceof Snake && result.number === this.number) {
        this.move.removeSnakeCollis();
        return;
      };

      if (result instanceof Cube && result.collisionScript) {
        result.script.destroy("moveduetocollisition")
        return;
      }

    })
  }

  collisionCube(otherEntity) {
    var isMyCube = false;
    this.cubeStack.cubes.forEach(element => {
      if (element === otherEntity) {
        isMyCube = true;
      }
    });
    if (!isMyCube) {
      if (otherEntity.manager) {
        if (otherEntity.number <= this.number) {
          this.cutTail(otherEntity)
        } else {
          SceneManager.currentScene.snakeDie(this)
        }
      } else {
        if (otherEntity.number <= this.number) {
          this.cubeStack.spawnCube(otherEntity.number)
          SceneManager.currentScene.pushCubeWait(otherEntity)
        }
        else {
          otherEntity.collisionScript = otherEntity.addScript(MoveDueToColis, {
            objCollistion: this,
          })
        }
      }
    }
  }

  collisionItem(item) {
    if (item.type == "itemx2") {
      this.eatItemX2();
    }

    if (item.type == "itemkhien") {
      console.log("an khien rui, nhma chua lam dc :((");
    }

    if (item.type == "itemspeed") {
      this.setSpeedIncrease(GameConstant.PLAYER_SPEED_UP + 2)
      setTimeout(() => {
        this.setSpeedReduce(GameConstant.PLAYER_SPEED)
      }, 4000)
    }

    SceneManager.currentScene.removeChild(item);
    setTimeout(() => {
      item.reloadItem(Helper.randomFloor(0, data.items.count))
      SceneManager.currentScene.addChild(item);
    }, 15000)
  }

  collisionSnake(snake) {
    // if (snake.number > this.number) {
    //   console.log("this die");
    //   return;
    // }

    if (snake.number === this.number) {
      this.move.setSnakeCollis(snake)
      return;
    }

    if (snake.number < this.number) {
      SceneManager.currentScene.snakeDie(snake)
      return;
    }

  }

  reverseDirection() {
    this != SceneManager.currentScene.player && this.direcVector.reverseDirection()
  }

  cutTail(cube) {
    if (!cube.manager) { return }

    var cubess = cube.manager.cubes
    for (var i = cubess.length - 1; i >= 0; i--) {
      cubess[i].script.destroy("moveWithPath")
      var tmp = cubess[i]
      cubess[i].parent.removeChild(cubess[i])
      tmp.destroy()
      cubess.splice(i, 1)
      if (cubess[i] === cube) {
        break;
      }
    }
  }

  eatItemX2() {
    this.levelUp();
    this.cubeStack.cubes.forEach(element => {
      element.levelUp()
    })
  }

  setSpeedIncrease(speed) {
    this.speedUp = true
    this.move.setSpeed(speed)
    if (this.cubeStack) {
      this.cubeStack.cubes.forEach(element => {
        element.speedIncrease(speed)
      });
    }
  }

  setSpeedReduce(speed) {
    this.speedUp = false
    this.move.setSpeed(speed)
    if (this.cubeStack) {
      this.cubeStack.cubes.forEach(element => {
        element.speedReduce(speed)
      });
    }
  }

}