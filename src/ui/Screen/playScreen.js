import { Vec2, Vec4 } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen"
import { ButtonSpeed } from "../ui/buttonSpeed";
import { ButtonMove } from "../ui/buttonMove";
import { BgButtonMove } from "../ui/bg_buttonMove";
import { SceneManager } from "../../Scene/SceneManager";


export class PlayScreen extends UIScreen {
  constructor() {
    super(GameConstant.SCREEN_PLAY);
    this._initButtonControls();
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

    // this._initInputBtMove();
  }

  // _initInputBtMove() {
  //   this.BgbtMove.element.on('mousedown', this.onBtMoveDown, this)
  //   this.BgbtMove.element.on('mousemove', this.onBtMoveMove, this)
  //   this.BgbtMove.element.on('mouseup', this.onBtMoveUp, this)
  //   this.BgbtMove.element.on('touchstart', this.onBtMoveDown, this)
  //   this.BgbtMove.element.on('touchmove', this.onBtMoveMove, this)
  //   this.BgbtMove.element.on('touchend', this.onBtMoveUp, this)
  // }

  onBtMoveDown(event) {
    SceneManager.currentScene.onBtMoveDown(event)
  }

  onBtMoveMove(event) {
    SceneManager.currentScene.onBtMoveMove(event)
  }

  onBtMoveUp(event) {
    SceneManager.currentScene.onBtMoveUp(event)
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