import { Loader } from "pixi.js";
import { AssetsLoader } from "../../assets/AssetsLoader";
import assetsData from "../../../assets/json/assetsData.json"
export class Audio {
    static _initAudio(obj) {
        obj.addComponent("sound");

        obj.sound.addSlot('eatsound', {
            asset: AssetsLoader.getAssetByKey('eatsound'),
            pitch: 3,
            loop: false,
            volume: 1,
            autoPlay: false,
        });

        obj.sound.addSlot('gamesound', {
            asset: AssetsLoader.getAssetByKey('gamesound'),
            pitch: 1,
            loop: true,
            volume: 0.3,
            autoPlay: false,
        });

        obj.sound.addSlot('homesound', {
            asset: AssetsLoader.getAssetByKey('homesound'),
            pitch: 1,
            loop: true,
            volume: 0.3,
            autoPlay: false,
        });

    }
}