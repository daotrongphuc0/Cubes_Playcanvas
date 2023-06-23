import { Entity } from "playcanvas";

export class Box extends Entity {
    constructor(name = "", number = 2) {
        super(name);
        this.number = number;
        this.nextBox = null;
        this.addComponent("model",
            {
                type: "box",
            })
    }
}
