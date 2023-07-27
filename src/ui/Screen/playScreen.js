import { Vec2, Vec4 } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen"
import { ButtonSpeed } from "../uiButton/buttonSpeed";
import { ButtonMove } from "../uiButton/buttonMove";
import { BgButtonMove } from "../uiButton/bg_buttonMove";
import { SceneManager } from "../../Scene/SceneManager";
import { Helper } from "../../Helper/Helper";
import { ButtonPause } from "../uiButton/buttonPause";
import { Util } from "../../Helper/util";


export class PlayScreen extends UIScreen {
  constructor() {
    super(GameConstant.SCREEN_PLAY);
    this._initButtonControls();
    this.touchedDown = false
    this.downPos = new Vec2()
  }

  _initButtonControls() {
    this.btSpeed = new ButtonSpeed({
      anchor: new Vec4(0.8, 0.3, 0.8, 0.3),
      pivot: new Vec2(0.5, 0.5),
      margin: new Vec4(),
    });
    this.addChild(this.btSpeed);

    this.btMove = new ButtonMove({
      anchor: new Vec4(0.2, 0.3, 0.2, 0.3),
      pivot: new Vec2(0.5, 0.5),
      margin: new Vec4(),
    });
    this.addChild(this.btMove);

    this.BgbtMove = new BgButtonMove({
      anchor: new Vec4(0.2, 0.3, 0.2, 0.3),
      pivot: new Vec2(0.5, 0.5),
      margin: new Vec4(),
    });
    this.addChild(this.BgbtMove);

    this.buttonPause = new ButtonPause({
      anchor: new Vec4(0.98, 0.98, 0.98, 0.98),
      pivot: new Vec2(1, 1),
      margin: new Vec4(),
    });
    this.addChild(this.buttonPause);

    this._initInputBtPause();
    this._initInputBtMove();
    this._initInputBtSpeed();
  }

  _initInputBtMove() {
    this.BgbtMove.element.on('mousedown', this.onBtMoveDown, this)
    this.BgbtMove.element.on('mousemove', this.onBtMoveMove, this)
    this.BgbtMove.element.on('mouseup', this.onBtMoveUp, this)
    this.BgbtMove.element.on('touchstart', this.onBtMoveDown, this)
    this.BgbtMove.element.on('touchmove', this.onBtMoveMove, this)
    this.BgbtMove.element.on('touchend', this.onBtMoveUp, this)
  }

  _initInputBtSpeed() {
    this.btSpeed.element.on('mousedown', this.onSpeedButtonDown, this)
    this.btSpeed.element.on('mouseup', this.onSpeedButtonUp, this)
    this.btSpeed.element.on('touchstart', this.onSpeedButtonDown, this)
    this.btSpeed.element.on('touchend', this.onSpeedButtonUp, this)
  }

  _initInputBtPause() {
    Util.registerOnTouch(this.buttonPause.element, this.onPauseButtonDown, this)
  }

  onPauseButtonDown() {
    SceneManager.currentScene.gamePause()
  }

  onSpeedButtonDown() {
    SceneManager.currentScene.player.activeAcceleration(GameConstant.PLAYER_SPEED_UP)
  }
  onSpeedButtonUp() {
    SceneManager.currentScene.player.activeDeceleration(GameConstant.PLAYER_SPEED)
  }

  onBtMoveDown(event) {
    this.touchedDown = true
    this.downPos.x = event.x
    this.downPos.y = event.y
  }

  onBtMoveMove(event) {
    if (this.touchedDown) {
      SceneManager.currentScene.player.move.setVector(Helper.getVector(this.downPos.x, this.downPos.y, event.x, event.y))
      this.setMove(Helper.getVector(this.downPos.x, this.downPos.y, event.x, event.y))
    }
  }

  onBtMoveUp(event) {
    this.touchedDown = false
    this.setDefault()
  }

  setMove(vector) {
    var distance = 40 * Math.sqrt(2)
    let angle = Math.atan2(vector.x, vector.z);
    this.btMove.setLocalPosition(distance * Math.cos(angle), distance * Math.sin(angle), 0);
  }

  setDefault() {
    this.btMove.setLocalPosition(0, 0, 0);
  }
}