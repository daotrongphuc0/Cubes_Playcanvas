import * as pc from "playcanvas";
import assetsData from "../../assets/json/assetsData.json";
import { Game } from "../game";

export class AssetsLoader {
    static loadAssets(app) {
        this.app = app
        this.assets = []
        assetsData.forEach(element => {
            let asset = new pc.Asset(element.key, element.type, {
                url: element.url,
            });
            this.assets.push(asset);
        });
        this.assetListLoader = new pc.AssetListLoader(
            this.assets,
            this.app.assets
        );
        this.assetListLoader.load((err) => {
            if (err) {
                console.log("false to load")
            } else {
                console.log("loaded")
                Game.load()
            }
        });
    }

    static getAssetByKey(id) {
        return this.assets.find((asset) => asset.name === id);
    }




}