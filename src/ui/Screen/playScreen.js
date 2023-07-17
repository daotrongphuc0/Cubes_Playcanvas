import { Vec2, Vec4 } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen"
import { ButtonSpeed } from "../ui/buttonSpeed";
import { ButtonMove } from "../ui/buttonMove";
import { BgButtonMove } from "../ui/bg_buttonMove";


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