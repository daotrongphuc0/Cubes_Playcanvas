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
import { Audio } from "../systems/sound/Audio";
import { SpawningEvent } from "../scripts/spawningEvent";
import { BoxCollider } from "../physics/scripts/boxCollider";
import { CollisionTag } from "../physics/collisionTag";
import { CollisionEvent } from "../physics/collissionEvent";


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
    this.eatItemSpeedUp = false
    this.timeSpeedUp = GameConstant.TIME_SPEED_UP
    this.pressButtonSpeed = false

    Audio._initAudio(this)

    this.move = this.addScript(SnakeMove, {
      speed: GameConstant.PLAYER_SPEED,
    })

    this.collider = this.addScript(BoxCollider, {
      scale: new pc.Vec3(scale, scale, scale),
      tag: CollisionTag.Snake
    });
    this.collider.on(CollisionEvent.OnCollide, this.onCollide, this);

    this.addComponent("rigidbody", {
      type: "kinematic",
    });

    this.addComponent('collision', {
      type: 'box',
      halfExtents: new pc.Vec3(scale, scale, scale)
    });

    this.collision.on('collisionstart', (result) => {
      var otherEntity = result.other;

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

  onCollide(other) {
    if (other.tag === CollisionTag.Wall) {
      this.reverseDirection();
    } else if (other.tag === CollisionTag.Item) {
      this.collisionItem(other.entity);
    }
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
          this.cubeStack.spawnCube(otherEntity.number)
          this.soundEat?.playSoundEat()
        } else {
          SceneManager.currentScene.snakeDie(this)
        }
      } else {
        if (otherEntity.number <= this.number) {
          this.cubeStack.spawnCube(otherEntity.number)
          this.soundEat?.playSoundEat()
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
    if (item.isDisable) { return }
    if (item.type == "itemx2") {
      this.eatItemX2();
    }

    if (item.type == "itemkhien") {
      console.log("an khien rui, nhma chua lam dc :((");
    }

    if (item.type == "itemspeed") {
      this.eatItemSpeedUp = true
      this.setSpeedIncrease(GameConstant.PLAYER_SPEED_UP + 1)

      setTimeout(() => {
        this.eatItemSpeedUp = false
        this.setSpeedReduce(GameConstant.PLAYER_SPEED)
      }, 4000)
    }

    SceneManager.currentScene.removeChild(item);
    item.isDisable = true
    setTimeout(() => {
      item.reloadItem(Helper.randomFloor(0, data.items.count))
      SceneManager.currentScene.addChild(item);
      // item.setLocalPosition(localPosi.x, 0.1, localPosi.z)
      item.isDisable = false
      console.log("Disable");
    }, 15000)
  }

  collisionSnake(snake) {
    if (snake.number === this.number) {
      this.move.setSnakeCollis(snake)
      return;
    }

    if (snake.number < this.number) {
      this.soundEat?.playSoundEat()
      SceneManager.currentScene.snakeDie(snake)
      return;
    }
  }

  reverseDirection() {
    this != SceneManager.currentScene.player && this.direcVector.reverseDirection()
  }

  cutTail(cube) {
    if (!cube.manager) { return }

    var cubes = cube.manager.cubes
    for (var i = cubes.length - 1; i >= 0; i--) {
      if (cubes[i] === cube) {
        // cubes[i].script.destroy("moveWithPath")
        cubes.splice(i, 1)
        cube.fire(SpawningEvent.Despawn)
        break;
      }

      var tmp_cube = new Cube(cubes[i].number)
      tmp_cube.setLocalPosition(cubes[i].getLocalPosition().x, 0, cubes[i].getLocalPosition().z)
      let rot = cubes[i].getEulerAngles();
      tmp_cube.setEulerAngles(rot.x, rot.y, rot.z);
      SceneManager.currentScene.addChild(tmp_cube)
      SceneManager.currentScene.cubes.push(tmp_cube)
      // cube.manager.spawner.despawn(cubes[i])
      cubes[i].fire(SpawningEvent.Despawn)
      cubes.splice(i, 1)

    }
  }

  eatItemX2() {
    this.levelUp();
    SceneManager.currentScene.ui.getScreen(GameConstant.SCREEN_PLAY).updateRanking()
    this.cubeStack.cubes.forEach(element => {
      element.levelUp()
    })
  }

  setSpeedIncrease(speed) {
    if (!this.speedUp) {
      this.speedUp = true
      this.move.setSpeed(speed)
      if (this.cubeStack) {
        this.cubeStack.cubes.forEach(element => {
          element.speedIncrease(speed)
        });
      }
    }
  }

  activeAcceleration(speed) {
    if (this.timeSpeedUp > 1 && !this.eatItemSpeedUp && !this.pressButtonSpeed) {
      this.pressButtonSpeed = true
      this.setSpeedIncrease(speed)
    }
  }

  activeDeceleration(speed) {
    if (!this.eatItemSpeedUp && this.pressButtonSpeed) {
      this.pressButtonSpeed = false
      this.setSpeedReduce(speed)
    }
  }

  setSpeedReduce(speed) {
    if (this.speedUp) {
      this.speedUp = false
      this.move.setSpeed(speed)
      if (this.cubeStack) {
        this.cubeStack.cubes.forEach(element => {
          element.speedReduce(speed)
        });
      }
    }
  }

}