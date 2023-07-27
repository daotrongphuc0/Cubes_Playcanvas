import { Vec2, Vec3, Vec4, Entity, ELEMENTTYPE_TEXT, Color } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen";
import { BackgrondScreen } from "../background/backgroundScreen";
import { AssetsLoader } from "../../assets/AssetsLoader";
import { Helper } from "../../Helper/Helper";
import { ButtonSpeed } from "../uiButton/buttonSpeed";
import { ButtonMove } from "../uiButton/buttonMove";
import { BgButtonMove } from "../uiButton/bg_buttonMove";
import { ButtonPause } from "../uiButton/buttonPause";
import { ButtonPlayAgain } from "../uiButton/buttonPlayAgain";
import { TextFrame } from "../uiButton/textFrame";
import { ButtonPoint } from "../uiButton/buttonPoint";
import { Util } from "../../Helper/util";
import { SceneManager } from "../../Scene/SceneManager";
import { ButtonPlay } from "../uiButton/buttonPlay";


export class PauseScreen extends UIScreen {
    constructor() {
        super(GameConstant.SCREEN_PAUSE);
        this._initBackground();
        this._initButtonControls();
        this._initText()
    }

    _initButtonControls() {
        this.buttonPause = new ButtonPlay({
            anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new Vec2(0.5, 0.5),
            margin: new Vec4(),
        });
        this.addChild(this.buttonPause);

        Util.registerOnTouch(this.buttonPause.element, this.playGame, this)
    }

    _initBackground() {
        this.bg = new BackgrondScreen({
            anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new Vec2(0.5, 0.5),
        });
        this.addChild(this.bg);
        // Util.registerOnceTouch(this.bg.element, this.tapToScreen, this)
    }

    _initText() {
        this.text = new Entity("text");
        let font = AssetsLoader.getAssetByKey("CanvasFont");
        this.text.addComponent("element", {
            text: "Pause",
            fontAsset: font,
            fontSize: 72,
            type: ELEMENTTYPE_TEXT,
            color: new Color(1, 1, 1),
            pivot: new Vec2(0.5, 0.5),
            alignment: new Vec2(0.5, 0.5),
            anchor: new Vec4(0.5, 0.7, 0.5, 0.7),
            margin: new Vec4(),
        });
        this.addChild(this.text);
    }

    playGame() {
        SceneManager.currentScene.gameContinue()
    }

}