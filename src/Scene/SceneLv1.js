import { Color, Entity, LIGHTTYPE_DIRECTIONAL, Vec3 } from "playcanvas";
import { InputHandler, InputHandlerEvent } from "../scripts/inputHandler";
import { Player } from "../Object/player";
import { DetectPositionChanged } from "../scripts/detectPositionChanged";
import { CubeStackManager } from "../Object/cubeStackManager";
import { Tween } from "../systems/tween/tween";
import { GameConstant } from "../GameConstant";
import { Scene } from "./Scene";
import { Camera } from "../Object/Camera";
import { GroundShape } from "../Object/GroundShape";
import { Helper } from "../Helper/Helper";

export class TestScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_TEST);
  }

  create() {
    super.create();
    this._initialize();
  }

  _initialize() {
    this._initInputHandler();
    this._initLight();
    this._initCamera();
    this._initMap();
    this._initPlayer();

    this.ray = new pc.Ray();
    this.hitPosition = new pc.Vec3();
    this.touchedDown = false;
    this.startPos = new Vec3()
  }

  _initInputHandler() {
    let inputHandlerEntity = new Entity("input");
    this.inputHandler = inputHandlerEntity.addScript(InputHandler);
    this.addChild(inputHandlerEntity);
    this.inputHandler.on(InputHandlerEvent.PointerDown, this._onPointerDown, this);
    this.inputHandler.on(InputHandlerEvent.PointerMove, this._onPointerMove, this);
    this.inputHandler.on(InputHandlerEvent.PointerUp, this._onPointerUp, this);
  }

  _initMap() {
    this.groundShape = new GroundShape();

    this.addChild(this.groundShape);
  }

  _initPlayer() {
    this.player = new Player();
    this.addChild(this.player);
    this.player.setLocalScale(1, 1, 1);
    this.cubeStack = new CubeStackManager(this.player, 0.5);
    this.addChild(this.cubeStack);

    this.detectPositionChange = this.player.addScript(DetectPositionChanged, {
      onPositionChanged: this.cubeStack.enqueuePosition.bind(this.cubeStack),
      delta: 0.05,
    });

    Tween.createCountTween({
      duration: 2,
      loop: true,
      onRepeat: () => {
        this.cubeStack.spawnCube();
      },
    }).start();
  }

  _onPointerDown(event) {
    this.touchedDown = true;
    if (event.touches && event.touches[0]) {
      this.startPos = this.doRayCast(event.touches[0]);
    }
    else {
      this.startPos = this.doRayCast(event);
    }
  }

  _onPointerMove(event) {
    if (!this.touchedDown) {
      return;
    }
    if (event.touches && event.touches[0]) {
      this.player.playerMove.setVector(Helper.getVectorAngle(this.startPos, this.doRayCast(event.touches[0])))
    }
    else {
      this.player.playerMove.setVector(Helper.getVectorAngle(this.startPos, this.doRayCast(event)))
    }
  }

  _onPointerUp(e) {
    this.touchedDown = false
  }


  _initCamera() {
    this.camera = new Camera();
    this.addChild(this.camera);

  }

  _initLight() {
    this.directionalLight = new Entity("light-directional");
    this.addChild(this.directionalLight);

    this.directionalLight.addComponent("light", {
      type: LIGHTTYPE_DIRECTIONAL,
      color: new Color(0, 0, 0),
      castShadows: false,
      shadowDistance: 30,
      shadowResolution: 1024,
      shadowBias: 0.2,
      normalOffsetBias: 0.05,
      intensity: 0.85,
    });
    this.directionalLight.setLocalPosition(2, 30, -2);
    this.directionalLight.setLocalEulerAngles(45, 135, 0);

    // create directional light entity
    this.light = new pc.Entity("light");
    this.light.addComponent("light");
    this.addChild(this.light);
    this.light.setLocalEulerAngles(-43, 113, -16);
    this.light.setPosition(-7.42, 13, 1.23)
  }

  doRayCast(screenPosition) {
    var ray = this.ray;
    var hitPosition = this.hitPosition;

    this.camera.camera.screenToWorld(screenPosition.x, screenPosition.y, this.camera.camera.nearClip, this.ray.origin);
    this.camera.camera.screenToWorld(screenPosition.x, screenPosition.y, this.camera.camera.farClip, this.ray.direction);
    ray.direction.sub(this.ray.origin).normalize();

    var result = this.groundShape.groundShape.intersectsRay(ray, hitPosition);
    if (result) {
      return new Vec3(hitPosition.x, hitPosition.y, hitPosition.z);
    }
    return null;
  }
}