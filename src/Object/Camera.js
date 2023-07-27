import * as pc from "playcanvas";
import { GameConstant } from "../GameConstant";
import { FocusCamera } from "../scripts/focusCamera";


export class Camera extends pc.Entity {
    constructor(name) {
        super(name);
        this.addComponent("camera", {
            clearColor: new pc.Color(0.5, 0.6, 0.9),
        });

        this.focus = this.addScript(FocusCamera, {});

        this.setLocalScale(1, 1, 1)
        this.setLocalPosition(GameConstant.DEFAULT_LOCATION_CAMERA)
        this.setLocalEulerAngles(0, -90, -65);

        if (GameConstant.DEBUG_CAMERA) {
            this.addComponent("script");
            this.script.create("orbitCamera", {
                attributes: {
                    inertiaFactor: 0.1, // Override default of 0 (no inertia)
                    distanceMax: 150,
                    distanceMin: 20,
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
}