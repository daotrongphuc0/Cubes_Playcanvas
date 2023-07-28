import { Entity, Vec4, ELEMENTTYPE_TEXT, Color, Vec2 } from "playcanvas";
import { AssetsLoader } from "../../assets/AssetsLoader";
import { SceneManager } from "../../Scene/SceneManager";
export class BackgrondRanking extends Entity {
    constructor(data = {}) {
        super("button");
        data.type = "image";
        data.width = data.width || 250;
        data.height = data.height || 200;
        data.color = new pc.Color(1, 1, 1);
        this.addComponent("element", data);
        this.element.opacity = 0.3;
        this.text = []
        this.colorTextEnemy = new Color(0, 0, 0)
        this.colorTextPlayer = new Color(255 / 255, 215 / 255, 0 / 255)
        this._initText()
    }

    updateSnake() {
        if (!SceneManager.currentScene.snakes) { return };
        let sortedSnake = SceneManager.currentScene.snakes.slice()

        sortedSnake.sort((a, b) => b.number - a.number);
        let index = sortedSnake.findIndex((snake) => snake === SceneManager.currentScene.player);
        if (index > 4) {
            var dk = 4
        } else {
            var dk = 5
        }
        for (var i = 0; i < dk; i++) {
            if (i === index) {
                this.text[i][0].element.color = this.colorTextPlayer
                this.text[i][1].element.color = this.colorTextPlayer
            } else {
                this.text[i][0].element.color = this.colorTextEnemy
                this.text[i][1].element.color = this.colorTextEnemy
            }
            if (sortedSnake[i]) {
                this.text[i][0].element.text = `${i + 1}. ${sortedSnake[i].name}`
                this.text[i][1].element.text = `${sortedSnake[i].number}`
            } else {
                this.text[i][0].element.text = ""
                this.text[i][1].element.text = ""
            }
        }
        if (dk === 4) {
            if (sortedSnake[index]) {
                this.text[4][0].element.color = this.colorTextPlayer
                this.text[4][1].element.color = this.colorTextPlayer
                this.text[4][0].element.text = `${index + 1}. ${sortedSnake[index].name}`
                this.text[4][1].element.text = `${sortedSnake[index].number}`
            } else {
                this.text[4][0].element.text = ""
                this.text[4][1].element.text = ""
            }
        }
    }

    _initText() {
        for (var i = 0; i < 5; i++) {
            var text = new Entity("text");
            this.addChild(text);
            let font = AssetsLoader.getAssetByKey("CanvasFont");
            text.addComponent("element", {
                text: `${i}. snake${i}`,
                fontAsset: font,
                fontSize: 18,
                opacity: 0.8,
                type: ELEMENTTYPE_TEXT,
                color: new Color(0, 0, 0),
                pivot: new Vec2(0, 1),
                alignment: new Vec2(0.5, 0.5),
                anchor: new Vec4(0.05, 1 - i / 5, 0.05, 1 - i / 5),
                margin: new Vec4(),
            });

            var text1 = new Entity("text");
            this.addChild(text1);
            text1.addComponent("element", {
                text: `0`,
                fontAsset: font,
                fontSize: 18,
                opacity: 0.8,
                type: ELEMENTTYPE_TEXT,
                color: new Color(0, 0, 0),
                pivot: new Vec2(1, 1),
                alignment: new Vec2(0.5, 0.5),
                anchor: new Vec4(0.8, 1 - i / 5, 0.8, 1 - i / 5),
                margin: new Vec4(),
            });
            this.text.push([text, text1])
        }
    }

}
