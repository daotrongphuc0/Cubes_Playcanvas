import * as pc from "playcanvas";

export class Background extends pc.Entity {
    constructor() {
        super("background")

        this.material = new pc.StandardMaterial()
        this.material.diffuse = new pc.Color(31 / 255, 54 / 255, 97 / 255)
        this.material.diffuseTint = true
        this.material.tint = new pc.Color(1, 0, 0)
        this.material.update()
        // console.log(this.material)

        this.addComponent("model", {
            type: "plane",
            material: this.material,
        });
        this.setLocalScale(50, 0, 50)
        this.setLocalPosition(0, 0, 0)
        this.setLocalEulerAngles(0, 0, 0)


    }
}