import { Color, Entity, Keyboard, LIGHTTYPE_DIRECTIONAL, Vec2, Vec3, Vec4, events } from "playcanvas";
import { InputHandler, InputHandlerEvent } from "../scripts/inputHandler";
import { DetectPositionChanged } from "../scripts/detectPositionChanged";
import { CubeStackManager } from "../Object/cubeStackManager";
import { Tween } from "../systems/tween/tween";
import { GameConstant } from "../GameConstant";
import { Scene } from "./Scene";
import { Camera } from "../Object/Camera";
import { Helper } from "../Helper/Helper";
import { Cube } from "../Object/cube";
import { Snake } from "../Object/Snake";
import { Wall } from "../Object/Wall";
import { Background } from "../Object/Background";
import { Item } from "../Object/Item";
import data from "../../assets/json/datalv1.json";
import { PlayScreen } from "../ui/Screen/playScreen";


export class SceneLv1 extends Scene {
  constructor() {
    super(GameConstant.SCENE_TEST);
    this.snakes = []
    this.cubes = []
    this.player = null
    this.wall = []
  }

  create() {
    super.create();
    this.ui.addScreens(
      new PlayScreen()
    );
    this.screenplay = this.ui.getScreen(GameConstant.SCREEN_PLAY);
    this.ui.setScreenActive(GameConstant.SCREEN_PLAY);
    this._initialize();
  }

  _initialize() {
    this._initInputBtSpeed();
    this._initInputBtMove();
    this._initLight();
    this._initCamera();
    this._initBackground();
    this._initMap();
    this._initPlayer();
    this.spawns()

    this.touchedDown = false;
    this.downPos = new Vec2()

  }

  _initInputBtSpeed() {
    this.screenplay.btSpeed.element.on('mousedown', this.onSpeedButtonDown, this)
    this.screenplay.btSpeed.element.on('mouseup', this.onSpeedButtonUp, this)
    this.screenplay.btSpeed.element.on('touchstart', this.onSpeedButtonDown, this)
    this.screenplay.btSpeed.element.on('touchend', this.onSpeedButtonUp, this)
  }

  keydown(event) {
    if (event.keyCode === 32) {
      this.onSpeedButtonDown()
    }
  }

  keyup(event) {
    if (event.keyCode === 32) {
      this.onSpeedButtonUp()
    }
  }

  onSpeedButtonDown() {
    this.player.setSpeed(GameConstant.PLAYER_SPEED_UP)
  }
  onSpeedButtonUp() {
    this.player.setSpeed(GameConstant.PLAYER_SPEED)
  }

  _initInputBtMove() {
    this.screenplay.BgbtMove.element.on('mousedown', this.onBtMoveDown, this)
    this.screenplay.BgbtMove.element.on('mousemove', this.onBtMoveMove, this)
    this.screenplay.BgbtMove.element.on('mouseup', this.onBtMoveUp, this)
    this.screenplay.BgbtMove.element.on('touchstart', this.onBtMoveDown, this)
    this.screenplay.BgbtMove.element.on('touchmove', this.onBtMoveMove, this)
    this.screenplay.BgbtMove.element.on('touchend', this.onBtMoveUp, this)
  }

  onBtMoveDown(event) {
    this.touchedDown = true
    this.downPos.x = event.x
    this.downPos.y = event.y
  }

  onBtMoveMove(event) {
    if (this.touchedDown) {
      this.player.move.setVector(Helper.getVector(this.downPos.x, this.downPos.y, event.x, event.y))
      this.screenplay.setMove(Helper.getVector(this.downPos.x, this.downPos.y, event.x, event.y))
    }
  }

  onBtMoveUp(event) {
    this.touchedDown = false
    this.screenplay.setDefault()
  }

  _initBackground() {
    this.backGround = new Background(data.background.size[0], data.background.size[1]);
    this.addChild(this.backGround);

    var wallTop = new Wall(new Vec3(data.background.size[0] / 2 + GameConstant.SIZE_WALL_AROUND, 0, 0),
      new Vec2(GameConstant.SIZE_WALL_AROUND * 2, data.background.size[1] + GameConstant.SIZE_WALL_AROUND * 4))
    this.addChild(wallTop)
    this.wall.push(wallTop)

    var wallRight = new Wall(new Vec3(0, 0, data.background.size[1] / 2 + GameConstant.SIZE_WALL_AROUND),
      new Vec2(data.background.size[0] + GameConstant.SIZE_WALL_AROUND * 4, GameConstant.SIZE_WALL_AROUND * 2))
    this.addChild(wallRight)
    this.wall.push(wallRight)

    var wallBot = new Wall(new Vec3(-(data.background.size[0] / 2 + GameConstant.SIZE_WALL_AROUND), 0, 0),
      new Vec2(GameConstant.SIZE_WALL_AROUND * 2, data.background.size[1] + GameConstant.SIZE_WALL_AROUND * 4))
    this.addChild(wallBot)
    this.wall.push(wallBot)

    var wallLeft = new Wall(new Vec3(0, 0, -(data.background.size[1] / 2 + GameConstant.SIZE_WALL_AROUND)),
      new Vec2(data.background.size[0] + GameConstant.SIZE_WALL_AROUND * 4, GameConstant.SIZE_WALL_AROUND * 2))
    this.addChild(wallLeft)
    this.wall.push(wallLeft)
  }

  _initMap() {
    data.map.forEach(element => {
      var wall = new Wall(new Vec3(element.position[0], element.position[1], element.position[2]),
        new Vec2(element.size[0], element.size[1]))
      this.addChild(wall)
      this.wall.push(wall)
    })

    data.items.list.forEach(element => {
      var item = new Item(Helper.randomFloor(0, data.items.count),);
      item.setLocalPosition(element.position[0], 0.1, element.position[2])
      this.addChild(item)
    })
  }

  _initPlayer() {
    this.create_player("aaaa", 64, new Vec3(0, 0, -15))
    this.create_snake("bbbb", 8, new Vec3(0, 0, 3))
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

    snake.cubeStack = new CubeStackManager(snake, 0.5);
    this.addChild(snake.cubeStack);

    snake.detectPositionChange = snake.addScript(DetectPositionChanged, {
      onPositionChanged: snake.cubeStack.enqueuePosition.bind(snake.cubeStack),
      delta: 0.05,
    });
    // Tween.createCountTween({
    //   duration: 2,
    //   loop: true,
    //   onRepeat: () => {
    //     var num = Helper.randomFloor(1, 4)
    //     snake.cubeStack.spawnCube(Math.pow(2, num));
    //   },
    // }).start();
    this.snakes.push(snake)


  }

  create_player(name = "", number = 2, position = new Vec3) {
    if (!this.player) {
      this.player = new Snake(name, number);
      this.player.setLocalPosition(position)
      this.addChild(this.player);
      this.player.cubeStack = new CubeStackManager(this.player, 0.5);
      this.addChild(this.player.cubeStack);
      this.player.detectPositionChange = this.player.addScript(DetectPositionChanged, {
        onPositionChanged: this.player.cubeStack.enqueuePosition.bind(this.player.cubeStack),
        delta: 0.05,
      });

      this.snakes.push(this.player)
      this.camera1.focus.objectFocus = this.player
    }
    // Tween.createCountTween({
    //   duration: 2,
    //   loop: true,
    //   repeat: 3,
    //   repeatDelay: 3,
    //   onRepeat: () => {
    //     var num = Helper.randomFloor(1, 5)
    //     this.player.cubeStack.spawnCube(Math.pow(2, num));
    //   },
    // }).start();
  }



  spawns() {
    for (var i = this.cubes.length; i < data.cube.count; i++) {
      this.spawn()
    }
  }

  spawn(cube = new Cube(2)) {
    console.log("spawn");
    var x = Helper.randomFloor(-data.background.size[0] / 2 - 1, data.background.size[0] / 2 - 1)
    var y = Helper.randomFloor(-data.background.size[1] / 2, data.background.size[1] / 2)
    var num = Helper.randomFloor(0, 4)

    cube.setLocalPosition(x, 0, y)
    this.wall.forEach(element => {
      if (element.orientedBox.containsPoint(cube.getLocalPosition())) {
        this.spawn(cube)
        return;
      }
    })
    cube.updateChance(Math.pow(2, num))
    this.addChild(cube)
    this.cubes.push(cube)
  }

  randomPosition(cube) {
    var x = Helper.randomFloor(-data.background.size[0] / 2 - 1, data.background.size[0] / 2 - 1)
    var y = Helper.randomFloor(-data.background.size[1] / 2, data.background.size[1] / 2)
    var num = Helper.randomFloor(0, 4)
    cube.setLocalPosition(x, 0, y)
    this.wall.forEach(element => {
      if (element.orientedBox.containsPoint(cube.getLocalPosition())) {
        this.randomPosition(cube)
        return;
      }
    })
    cube.updateChance(Math.pow(2, num))
  }
}

