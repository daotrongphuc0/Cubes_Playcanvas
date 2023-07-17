import { Vec3 } from "playcanvas";
import { Cube } from "./cube";
import { GameConstant } from "../GameConstant";
import { Helper } from "../Helper/Helper";
import { SnakeMove } from "../scripts/moveObject/snakeMove";
import { Wall } from "./Wall";
import { Item } from "./Item";
import { SceneManager } from "../Scene/SceneManager";


export class Snake extends Cube {
	constructor(name, num) {
		super(num);
		this.moved = false;
		this.startPos = new Vec3();
		this.name = name;
		var scale = Helper.getScaleByNumber(num);
		this.setLocalScale(scale, scale, scale)

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
				return
			}

			if (otherEntity instanceof Item) {
				console.log("Player va chạm với item");
				this.collisionItem(otherEntity)
				return
			}

			if (otherEntity instanceof Snake) {
				console.log("Player va chạm với snake");
				return;
			}
			if (otherEntity instanceof Cube) {
				this.collisionCube(otherEntity)
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
			if (otherEntity.number <= this.number) {
				this.cubeStack.spawnCube(otherEntity.number)
				// SceneManager.currentScene.removeChild(otherEntity)
				SceneManager.currentScene.randomPosition(otherEntity)
			}
			// else{
			// 	otherEntity.
			// }
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
			this.setSpeed(GameConstant.PLAYER_SPEED_UP + 2)
			setTimeout(() => {
				this.setSpeed(GameConstant.PLAYER_SPEED)
			}, 4000)
		}

		SceneManager.currentScene.removeChild(item);
		item.destroy()
	}

	eatItemX2() {
		this.levelUp();
		this.cubeStack.cubes.forEach(element => {
			element.levelUp()
		})
	}

	setSpeed(speed) {
		this.move.setSpeed(speed)
		if (this.cubeStack) {
			this.cubeStack.cubes.forEach(element => {
				element.mover.setSpeed(speed)
			});
		}
	}

}