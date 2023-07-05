import { Color, Entity, LIGHTTYPE_DIRECTIONAL, Vec2, Vec3 } from "playcanvas";
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
import { Cube } from "../Object/cube";
import { Snake } from "../Object/Snake";

export class TestScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_TEST);
    this.snakes = []
    this.box = []
    this.player = null
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
    this.downPos = new Vec2()
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
    this.create_player("aaaa", 32, new Vec3(0, 0, 0))
    this.create_snake("bbbb", 8, new Vec3(0, 0, 0))
    this.cube = new Cube(200);
    this.addChild(this.cube);
  }

  _onPointerDown(event) {
    this.touchedDown = true;
    if (event.touches && event.touches[0]) {
      this.downPos.x = event.touches[0].x
      this.downPos.y = event.touches[0].y
    }
    else {
      this.downPos.x = event.x
      this.downPos.y = event.y
    }
  }

  _onPointerMove(event) {
    if (!this.touchedDown) {
      return;
    }
    if (event.touches && event.touches[0]) {
      // this.player.playerMove.setVector(Helper.getVectorAngle(this.downPos, this.doRayCast(event.touches[0])))
      this.player.playerMove.setVector(Helper.getVector(this.downPos.x, this.downPos.y, event.touches[0].x, event.touches[0].y))
    }
    else {
      // this.player.playerMove.setVector(Helper.getVectorAngle(this.downPos, this.doRayCast(event)))
      this.player.playerMove.setVector(Helper.getVector(this.downPos.x, this.downPos.y, event.x, event.y))
    }
  }

  _onPointerUp(e) {
    this.touchedDown = false
  }


  _initCamera() {
    this.camera1 = new Camera();
    this.addChild(this.camera1);
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


  create_snake(name = "", number, position = new Vec3) {
    var snake = new Snake(name, number);
    this.addChild(snake);
    snake.setLocalPosition(position)
    var cubeStack1 = new CubeStackManager(snake, 0.5);
    this.addChild(cubeStack1);

    var detectPositionChange1 = snake.addScript(DetectPositionChanged, {
      onPositionChanged: cubeStack1.enqueuePosition.bind(cubeStack1),
      delta: 0.05,
    });
    // Tween.createCountTween({
    //   duration: 2,
    //   loop: true,
    //   onRepeat: () => {
    //     this.cubeStack1.spawnCube();
    //   },
    // }).start();
    this.snakes.push({
      head: snake,
      cubeManager: cubeStack1,
      detectPosChance: detectPositionChange1,
    })


  }

  create_player(name = "", number = 2, position = new Vec3) {
    if (!this.player) {
      this.player = new Player(name, number);
      this.player.setLocalPosition(position)
      this.addChild(this.player);
      this.cubeStack = new CubeStackManager(this.player, 0.5);
      this.addChild(this.cubeStack);

      this.detectPositionChange = this.player.addScript(DetectPositionChanged, {
        onPositionChanged: this.cubeStack.enqueuePosition.bind(this.cubeStack),
        delta: 0.05,
      });

      this.snakes.push({
        head: this.player,
        cubeManager: this.cubeStack,
        detectPosChance: this.detectPositionChange,
      })

      this.camera1.focus.objectFocus = this.player
    }

    // Tween.createCountTween({
    //   duration: 2,
    //   loop: true,
    //   onRepeat: () => {
    //     this.cubeStack.spawnCube();
    //   },
    // }).start();
  }
}