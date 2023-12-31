import { Entity, OrientedBox, Vec3 } from "playcanvas";
import { CollisionDetector } from "../collisionDetector";
import { CollisionTag } from "../collisionTag";
import { Script } from "../../systems/script/script";

export const BoxCollider = Script.createScript({
  name: "boxCollider",

  attributes: {
    tag      : { default: CollisionTag.Default },
    position : { default: new Vec3() },
    scale    : { default: new Vec3(1, 1, 1) },
    render: { default: false },
    IgnoreColliders: { default: [] },
    owner: { default: null },
  },

  initialize() {
    this.owner = this.owner ? this.owner : this.entity;
    this.box = new Entity("box");
    this.box.addComponent("model", { type: "box" });
    this.box.setLocalPosition(this.position);
    this.box.setLocalScale(this.scale);
    this.box.enabled = this.render;
    
    this.entity.addChild(this.box);
    CollisionDetector.instance.add(this);
  },

  onDestroy() {
    CollisionDetector.instance.remove(this);
  },

  getBound() {
    return this.box.model.meshInstances[0].aabb;
  },
});
