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


export class StartScreen extends UIScreen {
    constructor() {
        super(GameConstant.SCREEN_START);
        this._initBackground();
        this._initButtonControls();
    }

    _initButtonControls() {
        this.btSpeed = new ButtonSpeed({
            anchor: new Vec4(0.8, 0.3, 0.8, 0.3),
            pivot: new Vec2(0.5, 0.5),
            margin: new Vec4(),
        });
        this.addChild(this.btSpeed);

        this.textBtSpeed = new TextFrame({
            anchor: new Vec4(0.53, 0.27, 0.53, 0.27),
            pivot: new Vec2(0.5, 0),
            margin: new Vec4(),
            text: `Tap or click enter this button 
to acceleration. If you have a keyboard,
you can press the Space button`,
        });
        this.addChild(this.textBtSpeed);

        this.buttonPoint2 = new ButtonPoint({
            anchor: new Vec4(0.72, 0.3, 0.72, 0.3),
            pivot: new Vec2(0.5, 0.5),
            margin: new Vec4(),
            width: 50,
            height: 50,
        }, 0);
        this.addChild(this.buttonPoint2);

        this.buttonPause = new ButtonPause({
            anchor: new Vec4(0.98, 0.98, 0.98, 0.98),
            pivot: new Vec2(1, 1),
            margin: new Vec4(),
        });
        this.addChild(this.buttonPause);
        this.buttonPoint1 = new ButtonPoint({
            anchor: new Vec4(0.9, 0.92, 0.9, 0.97),
            pivot: new Vec2(0.5, 0.5),
            margin: new Vec4(),
            width: 50,
            height: 50,
        }, 0);
        this.addChild(this.buttonPoint1);

        this.textBtPause = new TextFrame({
            anchor: new Vec4(0.7, 0.9, 0.7, 0.9),
            pivot: new Vec2(0.5, 0),
            margin: new Vec4(),
            text: `Tap or click enter this button
to pause game. If you have a keyboard,
you can press the ESC button`,
        });
        this.addChild(this.textBtPause);



        this.textTapToStart = new TextFrame({
            anchor: new Vec4(0.5, 0.01, 0.5, 0.01),
            pivot: new Vec2(0.5, 0),
            margin: new Vec4(),
            text: "Tap or click on the screen to start",
            fontSize: 16
        });
        this.addChild(this.textTapToStart);




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
        this.textBgbtMove = new TextFrame({
            anchor: new Vec4(0.2, 0.55, 0.2, 0.55),
            pivot: new Vec2(0.5, 0),
            margin: new Vec4(),
            text: `Tap or click enter this 
button and move to control snake`,
        });
        this.addChild(this.textBgbtMove);

        this.buttonPoint3 = new ButtonPoint({
            anchor: new Vec4(0.2, 0.47, 0.2, 0.47),
            pivot: new Vec2(0.5, 0.5),
            margin: new Vec4(),
            width: 50,
            height: 50,
        }, 0);
        this.buttonPoint3.setEulerAngles(0, 0, -90);
        this.addChild(this.buttonPoint3);

    }

    _initBackground() {
        this.bg = new BackgrondScreen({
            anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new Vec2(0.5, 0.5),
        });
        this.addChild(this.bg);
        Util.registerOnceTouch(this.bg.element, this.tapToScreen, this)
    }

    tapToScreen() {
        SceneManager.currentScene.ShowGamePlay()
        SceneManager.currentScene.isPause = false
    }

}