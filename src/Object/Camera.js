import * as pc from "playcanvas";


export class Camera extends pc.Entity {
    constructor(name) {
        super(name);
        this.addComponent("camera", {
            clearColor: new pc.Color(0.5, 0.6, 0.9),

        });

        this.setLocalScale(1, 1, 1)
        this.setLocalPosition(-10, 25, 0)
        this.setLocalEulerAngles(0, -90, -65);

        // this.addComponent("script");
        // this.script.create("orbitCamera", {
        //     attributes: {
        //         inertiaFactor: 0.1, // Override default of 0 (no inertia)
        //         distanceMax: 50,
        //         distanceMin: 1,
        //         pitchAngleMax: 90,
        //         pitchAngleMin: -90,
        //         focusEntity: null,
        //         frameOnStart: true
        //     },
        // });
        // this.script.create("orbitCameraInputMouse");
        // this.script.create("orbitCameraInputTouch");
    }
}