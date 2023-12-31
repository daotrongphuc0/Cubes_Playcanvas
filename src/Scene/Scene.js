import { Entity } from "playcanvas";
import { Debug } from "../Helper/Debug";
import { UIManager } from "../ui/UIManager";

export class Scene extends Entity {
    constructor(key) {
        super(key);
        this.key = key;
        this.ui = new UIManager();
        this.addChild(this.ui);
    }

    create() {
        // Debug.log(`${this.key}Scene`, "Create");
        console.log(`${this.key} Create`);
    }

    update() {
        this.ui.update();
    }

    resize() {
        this.ui.resize();
    }

    pause() {
        this.ui.pause();
    }

    resume() {
        this.ui.resume();
    }

    destroy() {
        super.destroy();
    }
}
