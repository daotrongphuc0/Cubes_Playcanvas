import { Entity, Vec3, PointAndClick } from "playcanvas";
import { Camera } from "../Object/Camera";
import * as pc from "playcanvas"
import { Snake } from "../Object/Snake";
import { Background } from "../Object/Background";
import { Helper } from "../Helper/Helper";
import { GroundShape } from "../Object/GroundShape";
import { Box } from "../Object/Box";
import { Queue } from "../Helper/Queue";
import { Scene } from "./Scene";

export class ScenePlay extends Scene {
    constructor() {
        super()
        this.angle = -Math.PI / 2

        this.hitPosition = new pc.Vec3();
        this.ray = new pc.Ray();
        this.speed = 1;
        this.direction = new pc.Vec3();
        this.distanceToTravel = 0;
        this.targetPosition = new pc.Vec3();

        // camera
        this.camera = new Camera("camera");
        this.addChild(this.camera)

        // create directional light entity
        this.light = new pc.Entity("light");
        this.light.addComponent("light");
        this.addChild(this.light);
        this.light.setLocalEulerAngles(-43, 113, -16);
        this.light.setPosition(-7.42, 13, 1.23)

        this.groundShape = new GroundShape()
        this.addChild(this.groundShape);

        // Tạo đối tượng hộp
        this.snake = new Snake("box", 16384);
        this.addChild(this.snake);
        this.snake.setLocalPosition(0, 0, 0)
        this.snake.lastPosition = new pc.Vec3(0, 0, 0)


        // Tạo đối tượng hộp
        this.box = new Box();
        this.addChild(this.box);
        this.box.setLocalPosition((Helper.getScaleByNumber(this.box.number) + 4 + Helper.getScaleByNumber(this.box.number)), 0, 0)
        this.snake.nextBox = this.box
        this.box.queue.enqueue(this.snake.getLocalPosition())



    }

    update(deltaTime) {
        // this.boxHead.update(this.angle, deltaTime);
        this.snake.update(this.angle, deltaTime)
    }

    onMouseMove(event) {
        this.doRayCast(event);
    }

    doRayCast(screenPosition) {
        var ray = this.ray;
        var hitPosition = this.hitPosition;

        this.camera.camera.screenToWorld(screenPosition.x, screenPosition.y, this.camera.camera.nearClip, this.ray.origin);
        this.camera.camera.screenToWorld(screenPosition.x, screenPosition.y, this.camera.camera.farClip, this.ray.direction);
        ray.direction.sub(this.ray.origin).normalize();

        var result = this.groundShape.groundShape.intersectsRay(ray, hitPosition);
        if (result) {
            this.angle = Helper.getAngle(this.snake.getLocalPosition().z, this.snake.getLocalPosition().x,
                hitPosition.z, hitPosition.x);
        }
    }

}