import * as pc from "playcanvas";


export class Camera extends pc.Entity {
    constructor(name) {
        super(name);
        this.addComponent("camera", {
            clearColor: new pc.Color(0.5, 0.6, 0.9),
        });


        this.setLocalScale(1, 1, 1)
        this.setLocalPosition(0.012, 3.865, 6.93)
        this.setLocalEulerAngles(-30, 0, 0);
        this.addComponent("script");
        this.script.create("orbitCamera", {
            attributes: {
                inertiaFactor: 0.1, // Override default of 0 (no inertia)
                distanceMax: 100,
                distanceMin: 1,
                pitchAngleMax: 90,
                pitchAngleMin: -90,
                focusEntity: null,
                frameOnStart: true
            },
        });
        this.script.create("orbitCameraInputMouse");
        this.script.create("orbitCameraInputTouch");


    }
}