import { Application, ElementInput, Keyboard, Mouse, TouchDevice, StandardMaterial, Color, RESOLUTION_AUTO, FILLMODE_FILL_WINDOW, Vec3 } from "playcanvas";
import { AssetsLoader } from "./assets/AssetsLoader";
import { loadObitCameraPlugin } from "../src/orbit-camera";
import * as pc from "playcanvas"
import { ScenePlay } from "./Scene/ScenePlay";
import { SceneManager } from "./Scene/SceneManager";
import { InputManager } from "./systems/input/inputManager"
import { Time } from "./systems/time/time"
import { Tween } from "./systems/tween/tween"
import { GameConstant } from "./GameConstant";
import { TestScene } from "./Scene/testScene";

export class Game {
    static init() {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        this.app = new Application(canvas, {
            elementInput: new ElementInput(canvas),
            keyboard: new Keyboard(window),
            mouse: new Mouse(canvas),
            touch: new TouchDevice(canvas),
        });
        this.app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(RESOLUTION_AUTO);
        this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
        loadObitCameraPlugin();
        AssetsLoader.loadAssets(this.app)
        this.app.start();
    }

    static load() {
        InputManager.init(this.app);
        Time.init(this.app);
        Tween.init(this.app);
        this.app.start();
        this.app.on("update", this.update, this);
    }

    static create() {
        this.gameCreated = true;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
        this.app.resizeCanvas(this.width, this.height);
        SceneManager.init([
            new ScenePlay(),
            new TestScene(),
        ]);
        SceneManager.loadScene(SceneManager.getScene(GameConstant.SCENE_TEST));

    }

    static update(dt) {
        SceneManager.update(Time.dt);
    }

    static resize(screenSize) {
        if (this.gameCreated) {
            this.width = screenSize.width;
            this.height = screenSize.height;
            this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
            this.app.resizeCanvas(this.width, this.height);
            SceneManager.resize();
            this.app.fire("resize");
        }
    }

}

//  chặn dùng chuột phải
window.addEventListener("contextmenu", (e) => e.preventDefault());

window.onload = function () {
    Game.init();
};

window.addEventListener("resize", (event) => {
    Game.resize({ width: window.innerWidth, height: window.innerHeight })
});
