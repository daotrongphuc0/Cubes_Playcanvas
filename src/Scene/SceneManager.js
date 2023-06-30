import { Game } from "../game";
import { Scene } from "./Scene";

export class SceneManager {
    /**
     * @param {Array<Scene>} scenes
     */
    static init(scenes) {
        this.scenes = scenes;
    }

    /**
     * @param {Scene} scene
     */
    static loadScene(scene) {
        let oldScene = this.currentScene;
        this.currentScene = scene;

        Game.app.root.addChild(this.currentScene);
        this.currentScene.create();

        if (oldScene) {
            Game.app.root.removeChild(oldScene);
            oldScene.destroy();
        }
    }

    static update(dt) {
        this.currentScene?.update(dt);
    }

    static resize() {
        this.currentScene?.resize();
    }

    static pause() {
        this.currentScene?.pause();
    }

    static resume() {
        this.currentScene?.resume();
    }

    static getScene(key) {
        return this.scenes.find((s) => s.key === key);
    }
}
