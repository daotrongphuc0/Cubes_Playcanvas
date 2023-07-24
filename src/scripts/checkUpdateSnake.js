import { Script } from "../systems/script/script";
import { Time } from "../systems/time/time";


export const CheckUpdateSnake = Script.createScript({
    name: "checkupdatesnake",
    attributes: {
        timeStepCheck: { default: 1 },
        isUpdate: { default: false }
    },
    timeCheck: 0,

    update() {
        if (this.timeCheck + this.timeStepCheck <= Time.get_timeGame() && this.isUpdate === true) {
            this.entity.checkUpdateSnake()
            this.setUpdate()
        }
    },

    setUpdate(bool = true) {
        this.isUpdate = bool
        this.timeCheck = Time.get_timeGame()
    }
})