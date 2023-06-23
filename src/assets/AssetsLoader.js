import * as pc from "playcanvas";
import assetsData from "../../assets/json/assetsData.json";

export class AssetsLoader {
    static loadAssets(app, callback) {
        this.app = app
        this.assets = []
        assetsData.forEach(element => {
            let asset = new pc.Asset(element.key, element.type, {
                url: element.url,
            });
            this.assets.push(asset);
        });
        const assetListLoader = new pc.AssetListLoader(
            this.assets,
            this.app.assets
        );
        assetListLoader.load((err, failed) => {
            if (err) {
                console.error(`${failed.length} assets failed to load`);
            } else {
                console.log(`${assets.length} assets loaded`);
                callback()
            }
        });
    }
}