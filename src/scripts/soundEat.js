import { Script } from "../systems/script/script";



export const SoundEat = Script.createScript({
    name: " SoundEat",
    playSoundEat() {
        this.entity.sound.play("eatsound")
    }
})