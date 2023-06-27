import { Application, ElementInput, Keyboard, Mouse, TouchDevice, StandardMaterial, Color, RESOLUTION_AUTO, FILLMODE_FILL_WINDOW, Vec3 } from "playcanvas";

import { AssetsLoader } from "./assets/AssetsLoader";
import { loadObitCameraPlugin } from "../src/orbit-camera";
import * as pc from "playcanvas"


import { SceneGame } from "./Scene/SceneGame";

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
        this.currentScene = new SceneGame();
        this.app.root.addChild(this.currentScene);

        this.app.on("update", deltaTime => {
            // // Di chuyển hộp theo trục x
            // var speed = 1; // Tốc độ di chuyển
            // this.currentScene.boxHead.update(new Vec3(1 * deltaTime, 0, 0));
            this.currentScene.update(deltaTime)
        });
        this.startPos = new pc.Vec2();

        // Attach mouse events to the canvas element
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }
    static onMouseDown(event) {
        if (event.button === pc.MOUSEBUTTON_LEFT) {

            this.currentScene.onMouseDown(event)
        }
    }

    // static onMouseUp(event) {
    //     if (event.button === pc.MOUSEBUTTON_LEFT) {
    //         // Calculate the swipe direction
    //         this.currentScene.onMouseUp(event)
    //     }
    // }

    // static onMouseMove(event) {
    //     if (event.buttons[pc.MOUSEBUTTON_LEFT]) { // Kiểm tra xem chuột trái có đang được nhấn hay không
    //         this.currentScene.onMouseMove(event);
    //     }
    // }
}

window.onload = function () {
    Game.init();
};
