import { Color, Entity, LIGHTTYPE_DIRECTIONAL, log } from "playcanvas";
import { GameConstant } from "../GameConstant";
import { Scene } from "./Scene";
import { InputHandler, InputHandlerEvent } from "../script/inputHandler";
import { Player } from "../Object/player";
import { DetectPositionChanged } from "../script/detectPositionChanged";
import { CubeStackManager } from "../Object/cubeStackManager";
import { Tween } from "../systems/tween/tween";
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

    // create directional light entity
    this.light = new pc.Entity("light");
    this.light.addComponent("light");
    this.addChild(this.light);
    this.light.setLocalEulerAngles(-43, 113, -16);
    this.light.setPosition(-7.42, 13, 1.23)
  }

  _initialize() {
    this._initInputHandler();
    this._initLight();
    this._initCamera();
    this._initMap();
    this._initPlayer();
    this.ray = new pc.Ray();
    this.hitPosition = new pc.Vec3();
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
    // this.map = new Entity();
    // this.map.addComponent("model", {
    //   type: "plane",
    // });
    // this.map.setLocalEulerAngles(0, 0, 0);
    // this.map.setLocalScale(10, 10, 10);
    // this.addChild(this.map);

    this.groundShape = new GroundShape()
    this.addChild(this.groundShape);

  }

  _initPlayer() {
    this.player = new Player();
    this.addChild(this.player);
    this.player.levelUp();
    this.cubeStack = new CubeStackManager(this.player, 0.5);
    this.addChild(this.cubeStack);

    this.detectPositionChange = this.player.addScript(DetectPositionChanged, {
      onPositionChanged: this.cubeStack.enqueuePosition.bind(this.cubeStack),
      delta: 0.05,
    });


    Tween.createCountTween({
      duration: 3,
      loop: true,
      onRepeat: () => {

        if (this.cubeStack.cubes.length < 3) {
          this.cubeStack.spawnCubes(1);
        }
        else {
          this.loop = false
        }
      },
    }).start();
  }

  // _onPointerDown(e) {
  //   this.player.playerMove.onPointerDown(e);
  //   this.cubeStack.startMove();
  // }

  // _onPointerMove(e) {
  //   this.player.playerMove.onPointerMove(e, this.player.getLocalPosition());
  // }

  // _onPointerUp(e) {
  //   this.player.playerMove.onPointerUp(e);
  //   this.cubeStack.stopMove();
  // }

  _initCamera() {
    // this.mainCamera = new Entity();
    // this.addChild(this.mainCamera);
    // this.mainCamera.addComponent("camera", {
    //   clearColor: new Color(0.5, 0.6, 0.9),
    //   farClip: 1000,
    //   fov: 60,
    //   nearClip: 0.1,
    // });
    // this.mainCamera.setLocalPosition(0, 10, 10);
    // this.mainCamera.setLocalEulerAngles(-40, 0, 0);

    // camera
    this.camera = new Camera("camera");
    this.addChild(this.camera)


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
  }

  _onPointerMove(event) {
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
      this.player.playerMove.setVector(Helper.getVectorAngle(this.player.getLocalPosition(), hitPosition))
    }
  }
}