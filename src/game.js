import { Application, ElementInput, Keyboard, Mouse, TouchDevice, StandardMaterial, Color, RESOLUTION_AUTO, FILLMODE_FILL_WINDOW } from "playcanvas";
import { Background } from "./Object/Background";
import { AssetsLoader } from "./assets/AssetsLoader";
import { loadObitCameraPlugin } from "../src/orbit-camera";
import { Camera } from "./Object/Camera";
import * as pc from "playcanvas"
import { Box } from "./Object/Box";

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

        // camera
        this.camera = new Camera("camera");
        this.app.root.addChild(this.camera)

        // create directional light entity
        this.light = new pc.Entity("light");
        this.light.addComponent("light");
        this.app.root.addChild(this.light);
        this.light.setLocalEulerAngles(45, 45, 90);

        // background
        this.app.root.addChild(new Background())

        // Tạo đối tượng hộp
        this.box = new Box("box", 2);
        this.app.root.addChild(this.box);

        // this.time = 1
        // this.iii = 1
        // this.app.on("update", (deltaTime) => {
        //     // Di chuyển hộp theo trục x
        //     //console.log(this.time)
        //     this.time -= deltaTime
        //     if (this.time <= 0) {
        //         this.iii++
        //         this.time = 1
        //         this.material.diffuse = Helper.getColorByNumber(this.iii);
        //         var scale = Helper.getScaleByNumber(this.iii)
        //         this.box1.setLocalScale(scale, scale, scale)
        //         this.material.update()
        //     }
        //     var speed = 1; // Tốc độ di chuyển
        //     this.box.translate(speed * deltaTime, 0, 0);
        // });

        // this.app.on("update", deltaTime => {
        //     // Di chuyển hộp theo trục x
        //     var speed = 1; // Tốc độ di chuyển
        //     this.box1.translate(speed * deltaTime, 0, 0);
        // });


    }
}

window.onload = function () {
    Game.init();
};
