import { Application, StandardMaterial, Color, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from "playcanvas";
import { Background } from "./Object/Background";
import { AssetsLoader } from "./assets/AssetsLoader";
import { loadObitCameraPlugin } from "../src/orbit-camera";
import { Camera } from "./Object/Camera";
// import * as pc from "playcanvas"

export class Game {
    static init() {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        this.app = new Application(canvas, {});
        this.app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(RESOLUTION_AUTO);
        this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
        AssetsLoader.loadAssets(this.app, this.load())
        this.app.start();

    }

    static load() {
        // create material
        this.material = new StandardMaterial();
        this.material.diffuse.set(1, 0, 0);
        this.material.outlineColor = new Color(0, 1, 0); // Màu viền (ở đây là màu xanh lá cây)
        this.material.outlineThickness = 0.9;
        // this.material.tin
        this.material.update()

        // camera
        loadObitCameraPlugin();
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
        this.box1 = new pc.Entity("box1");
        this.box1.addComponent("model", { type: "box", material: this.material });
        this.box1.setLocalScale(0.3, 0.3, 0.3)
        this.box1.setLocalPosition(0, 0.5, 0)
        this.box1.setLocalEulerAngles(0, 0, 0)
        this.app.root.addChild(this.box1);

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
