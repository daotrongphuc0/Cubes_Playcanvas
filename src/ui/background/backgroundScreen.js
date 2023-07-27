import { Entity, Vec4 } from "playcanvas";
export class BackgrondScreen extends Entity {
    constructor(data = {}) {
        super("button");
        data.type = "image";
        data.width = data.width || window.innerWidth + 1000;
        data.height = data.height || window.innerHeight + 1000;
        data.color = new pc.Color(0, 0, 0);
        this.addComponent("element", data);
        this.element.opacity = 0.8;

    }

}
