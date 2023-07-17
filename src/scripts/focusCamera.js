import { GameConstant } from "../GameConstant";
import { Script } from "../systems/script/script";


export const FocusCamera = Script.createScript({
    name: "FocusCamera",
    attributes: {
        objectFocus: { default: null },
    },

    update() {
        if (this.objectFocus) {
            var objPos = this.objectFocus.getLocalPosition()
            this.entity.setLocalPosition(objPos.x + GameConstant.DEFAULT_LOCATION_CAMERA.x,
                GameConstant.DEFAULT_LOCATION_CAMERA.y,
                GameConstant.DEFAULT_LOCATION_CAMERA.z + objPos.z)
        }
    }
})