import { Vec2, Vec3, Vec4, Entity, ELEMENTTYPE_TEXT, Color } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen";
import { ButtonPlayAgain } from "../uiButton/buttonPlayAgain";
import { SceneManager } from "../../Scene/SceneManager";
import { BackgrondScreen } from "../background/backgroundScreen";
import { AssetsLoader } from "../../assets/AssetsLoader";
import { Helper } from "../../Helper/Helper";



export class KilledScreen extends UIScreen {
  constructor() {
    super(GameConstant.SCREEN_GAME_OVER);
    this._initBackground();
    this._initButtonPlay();
    this._initText();
    this._initTextScore()
  }

  _initButtonPlay() {
    this.buttonPlay = new ButtonPlayAgain({
      anchor: new Vec4(0.4, 0.3, 0.6, 0.4),
      pivot: new Vec2(0.5, 0.5),
      margin: new Vec4(),
      width: 100,
      height: 50,
    });
    this.addChild(this.buttonPlay);

    this.buttonPlay.button.on("click", () => {
      SceneManager.currentScene.reloadGame()
    });

    this.buttonPlay.button.on("touchstart", () => {
      SceneManager.currentScene.reloadGame()
    });
  }

  _initBackground() {
    this.bg = new BackgrondScreen({
      anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new Vec2(0.5, 0.5),
    });
    this.addChild(this.bg);
  }

  _initText() {
    this.text = new Entity("text");
    let font = AssetsLoader.getAssetByKey("CanvasFont");
    this.text.addComponent("element", {
      text: "KILLED",
      fontAsset: font,
      fontSize: 68,
      type: ELEMENTTYPE_TEXT,
      color: new Color(1, 0, 0),
      pivot: new Vec2(0.5, 0.5),
      alignment: new Vec2(0.5, 0.5),
      anchor: new Vec4(0.4, 0.6, 0.6, 0.54),
      margin: new Vec4(),
    });
    this.addChild(this.text);
  }

  _initTextScore() {
    this.textScore = new Entity("text");
    let font = AssetsLoader.getAssetByKey("CanvasFont");
    this.textScore.addComponent("element", {
      text: "Your score is : 0",
      fontAsset: font,
      fontSize: 22,
      type: ELEMENTTYPE_TEXT,
      color: new Color(1, 1, 1),
      pivot: new Vec2(0.5, 0.5),
      alignment: new Vec2(0.5, 0.5),
      anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
      margin: new Vec4(),
    });
    this.addChild(this.textScore);
  }
  updateTextScore(score) {
    this.textScore.element.text = "Your score is : " + Helper.getStringByNumber(score);
  }
}