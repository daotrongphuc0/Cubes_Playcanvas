import { Vec2, Vec4 } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen"
import { Button } from "../ui/button";

export class PlayScreen extends UIScreen {
  constructor() {
    super(GameConstant.SCREEN_PLAY);
    this._initButtonControls();
  }

  _initButtonControls() {
    this.leftButton = new Button({
      anchor: new Vec4(0.7, 0.15, 0.7, 0.15),
      pivot: new Vec2(0.5, 0.5),
      margin: new Vec4(),
    });
    this.addChild(this.leftButton);
    this.leftButton.text.element.text = "Left";
  }
}