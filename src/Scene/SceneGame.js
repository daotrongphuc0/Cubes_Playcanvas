import { Entity, Vec3, PointAndClick } from "playcanvas";
import { Camera } from "../Object/Camera";
import * as pc from "playcanvas"
import { Box } from "../Object/Box";
import { Background } from "../Object/Background";
import { Helper } from "../Helper/Helper";
import { GroundShape } from "../Object/GroundShape";

export class SceneGame extends Entity {
    constructor() {
        super()

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

        // background
        // this.addChild(new Background())
        // Tạo đối tượng hình hộp đại diện cho mặt đất
        // this.groundShape = new pc.BoundingBox(new pc.Vec3(0, -0.001, 0), new pc.Vec3(50, 0.001, 50));
        this.groundShape = new GroundShape()
        this.addChild(this.groundShape);

        // Tạo đối tượng hộp
        this.box = new Box("box");
        this.addChild(this.box);
        this.box.setLocalPosition(0, 0, 0)
        this.box.lastPosition = new pc.Vec3(0, 0, 0)

        // Tạo đối tượng hộp
        this.boxHead = new Box("box1", 16384);
        this.boxHead.nextBox = this.box
        this.addChild(this.boxHead);
        // console.log(this.boxHead.get);
        this.boxHead.setLocalPosition((Helper.getScaleByNumber(this.box.number) + Helper.getScaleByNumber(this.boxHead.number)), 0, 0)
        this.boxHead.lastPosition = new pc.Vec3(3, 0, 0)
    }

    update(deltaTime) {
        // // this.boxHead.update(new Vec3(1 * deltaTime, 0, 0));
        // const swipeDirection = this.endPos.sub(this.startPos);

        // if (swipeDirection.length() > 0) {
        //     const movement = swipeDirection.normalize().scale(this.speed * deltaTime);
        //     // console.log(movement)
        //     this.boxHead.update(new Vec3(movement.x, 0, movement.y));
        // }
    }

    onMouseDown(event) {
        if (event.button == pc.MOUSEBUTTON_LEFT) {
            console.log(event.x + " " + event.y)
            this.doRayCast(event);
        }
    }

    doRayCast(screenPosition) {
        // Initialise the ray and work out the direction of the ray from the a screen position
        var ray = this.ray;
        var hitPosition = this.hitPosition;

        this.camera.camera.screenToWorld(screenPosition.x, screenPosition.y, this.camera.camera.nearClip, this.ray.origin);
        this.camera.camera.screenToWorld(screenPosition.x, screenPosition.y, this.camera.camera.farClip, this.ray.direction);
        ray.direction.sub(this.ray.origin).normalize();

        // Test the ray against the ground
        // var result =  this.groundShape.intersects
        var result = this.groundShape.groundShape.intersectsRay(ray, hitPosition);
        if (result) {
            this.movePlayerTo(hitPosition);
            console.log(hitPosition)
        }
    }

    movePlayerTo(worldPosition) {
        this.targetPosition.copy(worldPosition);

        // Assuming we are travelling on a flat, horizontal surface, we make the Y the same
        // as the player
        this.targetPosition.y = this.boxHead.getPosition().y;

        this.distanceTravelled = 0;

        // Work out the direction that the player needs to travel in
        this.direction.sub2(this.targetPosition, this.boxHead.getPosition());

        // Get the distance the player needs to travel for
        this.distanceToTravel = this.direction.length();

        if (this.distanceToTravel > 0) {
            // Ensure the direction is a unit vector
            this.direction.normalize();

            this.boxHead.lookAt(this.targetPosition);
        } else {
            this.direction.set(0, 0, 0);
        }
    }


}