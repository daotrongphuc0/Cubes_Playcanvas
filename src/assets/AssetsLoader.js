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
                Game.create()
            }
        });
    }

    static getAssetByKey(id) {
        return this.assets.find((asset) => asset.name === id);
    }

    static createCanvasFont(name, fontSize, fontWeight) {
        let canvasFontArial = new pc.CanvasFont(this.app, {
            color: new pc.Color(1, 1, 1),
            fontName: name,
            fontSize: fontSize,
            fontWeight: fontWeight,
        });
        canvasFontArial.createTextures("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-+/():;%&`'*#=[]\"");
        let fontAsset = new pc.Asset("CanvasFont", "font", {});
        fontAsset.resource = canvasFontArial;
        fontAsset.loaded = true;
        this.app.assets.add(fontAsset);
        this.assets.push(fontAsset);
        return fontAsset;
    }




}