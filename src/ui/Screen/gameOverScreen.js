import { Vec2, Vec3, Vec4 } from "playcanvas";
import { GameConstant } from "../../GameConstant";
import { UIScreen } from "../UIScreen";
import { Button } from "../ui/button";
import { SceneManager } from "../../Scene/SceneManager";



export class GameOverSreen extends UIScreen {
    constructor() {
        super(GameConstant.SCREEN_GAME_OVER);
        this._initButtonPlay();
    }

    _initButtonPlay() {
        this.buttonPlay = new Button({
            anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new Vec2(0.5, 0.5),
            margin: new Vec4(),
            width: 100,
            height: 50,
        });
        this.addChild(this.buttonPlay);

        this.buttonPlay.button.on("click", () => {
            SceneManager.currentScene.reload()
        });
    }
}