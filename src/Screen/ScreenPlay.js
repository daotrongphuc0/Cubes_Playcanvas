import { Entity, Vec2, Vec4 } from "playcanvas";
import { AssetsLoader } from "../assets/AssetsLoader";
import { Button } from "../Object/ui/button";
import * as pc from "playcanvas";
import { Game } from "../game";
import { UIScreen } from "../ui/UIScreen";

export class ScreenPlay extends Entity {
  constructor(isMobile = true) {
    super();
    this.vector = new pc.Vec3()
    this.isMobile = isMobile;
    this.addComponent("screen", {
      referenceResolution: new Vec2(1280, 720),
      scaleBlend: 0.5,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });

    this.speedButton = new Entity();
    this.speedButton.addComponent("element", {
      type: "image",
      textureAsset: AssetsLoader.getAssetByKey("bt_speed"),
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 80,
      height: 80,
      useInput: true,
    });
    this.speedButton.setLocalPosition(430, -160, 0);
    this.speedButton.element.opacity = 0.7;
    this.addChild(this.speedButton)

    this.bg_move = new Entity();
    this.bg_move.addComponent("element", {
      type: "image",
      textureAsset: AssetsLoader.getAssetByKey("bg_move"),
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 180,
      height: 180,
      useInput: true,
    });
    this.bg_move.setLocalPosition(-450, -150, 0);
    this.bg_move.element.opacity = 0.7;
    this.addChild(this.bg_move)

    this.moveButton = new Entity();
    this.moveButton.addComponent("element", {
      type: "image",
      textureAsset: AssetsLoader.getAssetByKey("bt_speed"),
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 50,
      height: 50,
      useInput: true,
    });
    this.moveButton.setLocalPosition(-450, -150, 0);
    this.moveButton.element.opacity = 1;
    this.addChild(this.moveButton)

  }

  setDefault() {
    this.moveButton.setLocalPosition(-450, -150, 0);
  }

  setMove(vector) {
    var distance = 45 * Math.sqrt(2)
    let angle = Math.atan2(vector.x, vector.z);
    console.log("XXX");
    this.moveButton.setLocalPosition(-450 + distance * Math.cos(angle), -150 + distance * Math.sin(angle), 0);
  }
}
