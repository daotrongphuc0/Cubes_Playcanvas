import { Entity, StandardMaterial, Color, Vec3 } from "playcanvas";
import { AssetsLoader } from "../assets/AssetsLoader";
import { Helper } from "../Helper/Helper";

export class Snake extends Entity {
    constructor(name = null, number = 2) {
        super(name);
        this.number = number;
        this.nextBox = null;
        this.lastTrans = new Vec3(0, 0, 0)
        this.speed = 2;


        // create material
        this.material = new StandardMaterial();
        this.material.diffuse = Helper.getColorByNumber(this.number);
        this.material.update()

        this.modelAsset = AssetsLoader.getAssetByKey("box")
        this.boxModel = new Entity()
        this.boxModel.addComponent("model", { asset: this.modelAsset });
        this.boxModel.model.meshInstances[0].material = this.material
        this.boxModel.setLocalPosition(0, 0, 0)
        this.boxModel.setLocalEulerAngles(0, 0, 0)
        var scale = Helper.getScaleByNumber(this.number)
        this.boxModel.setLocalScale(scale, scale, scale)
        this.addChild(this.boxModel);

        // text number
        AssetsLoader.createCanvasFont("Arial", 106, "bold");
        this.textEntity = new Entity();
        this.textEntity.addComponent("element", {
            type: "text",
            text: Helper.getStringByNumber(this.number),
            fontAsset: AssetsLoader.getAssetByKey("CanvasFont"),
            fontSize: 32,
            pivot: new pc.Vec2(0.5, 0.5), // Đặt pivot ở vị trí trung tâm của Text Element
            width: 200, // Điều chỉnh kích thước theo nhu cầu của bạn
            height: 50,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5) // Đặt anchor ở vị trí trung tâm của Text Element
        });
        // Gắn Text Element vào Entity
        this.textEntity.setLocalPosition(0, 2, -0.02); // Đặt vị trí của Text Element trong hình hộp
        this.textEntity.setLocalEulerAngles(-90, -90, 0)
        this.textEntity.setLocalScale(0.023, 0.023, 0.023);
        this.boxModel.addChild(this.textEntity);
    }

    update(angle, deltaTime) {
        if (this.nextBox) {
            this.nextBox.update(deltaTime)
            this.nextBox.queue.enqueue(this.getLocalPosition())
        }
        this.setLocalEulerAngles(0, Helper.toAngleDegree(angle - 90), 0)
        this.translate(this.speed * Math.sin(angle) * deltaTime, 0, this.speed * Math.cos(angle) * deltaTime)


        // console.log(this.getLocalPosition() + "------");

    }
}
