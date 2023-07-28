import { Application, ElementInput, Keyboard, Mouse, TouchDevice, WasmModule, RESOLUTION_AUTO, FILLMODE_FILL_WINDOW } from "playcanvas";
import { AssetsLoader } from "./assets/AssetsLoader";
import { loadObitCameraPlugin } from "../src/orbit-camera";
import { SceneManager } from "./Scene/SceneManager";
import { InputManager } from "./systems/input/inputManager"
import { Time } from "./systems/time/time"
import { Tween } from "./systems/tween/tween"
import { GameConstant } from "./GameConstant";
import { SceneLv1 } from "./Scene/SceneLv1";
import { PlayScreen } from "./ui/Screen/playScreen";
import { Physics } from "./physics/physics";
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
        WasmModule.setConfig("Ammo", {
            glueUrl: "assets/libs/ammo.wasm.js",
            wasmUrl: "assets/libs/ammo.wasm.wasm",
            fallbackUrl: "assets/libs/ammo.js",
        });
        loadObitCameraPlugin();
        WasmModule.getInstance("Ammo", () => {
            AssetsLoader.loadAssets(this.app)
        });
        this.app.systems.rigidbody.gravity.set(0, 0, 0)

        this.app.on("initialize", () => {
            document.addEventListener("keydown", (event) => {
                SceneManager.currentScene.keydown(event)
            });

            document.addEventListener("keyup", (event) => {
                SceneManager.currentScene.keyup(event)
            });
        });

        document.body.appendChild(this.app.graphicsDevice.canvas);
    }

    static load() {
        this.app.start();
        InputManager.init(this.app);
        Time.init(this.app);
        Tween.init(this.app);
        Physics.init(this.app);
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
            new SceneLv1(),
        ]);
        SceneManager.loadScene(SceneManager.getScene(GameConstant.SCENE_PLAY));
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
