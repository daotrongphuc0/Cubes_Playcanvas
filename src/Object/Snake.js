import { Vec3 } from "playcanvas";
import { Cube } from "./cube";
import { GameConstant } from "../GameConstant";
import { Helper } from "../Helper/Helper";
import { SnakeMove } from "../scripts/moveObject/snakeMove";
import { Wall } from "./Wall";
import { Item } from "./Item";


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

        console.log(scale)
        this.collision.on('collisionstart', (result) => {
            console.log(result);
            var otherEntity = result.other;

            if (otherEntity instanceof Wall) {
                console.log("Player va chạm với Wall");
            }

            if (otherEntity instanceof Item) {
                console.log("Player va chạm với item");
            }

            if (otherEntity instanceof Cube) {
                var isMyCube = false;
                this.cubeStack.cubes.forEach(element => {
                    if (element === otherEntity) {
                        isMyCube = true;
                    }
                });
                if (!isMyCube) {
                    console.log("XXX");
                }
            }

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