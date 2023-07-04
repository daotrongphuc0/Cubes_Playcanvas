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
import { GameConstant } from "../GameConstant";

export class ScenePlay extends Scene {
    constructor() {
        super(GameConstant.SCENE_PLAY)
        this.angle = -Math.PI / 2

        this.hitPosition = new pc.Vec3();
        this.ray = new pc.Ray();
        this.speed = 1;


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


    }

    update(deltaTime) {
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