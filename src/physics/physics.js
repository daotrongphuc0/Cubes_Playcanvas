import { CollisionDetector } from "./collisionDetector";
import { CollisionTag } from "./collisionTag";

export class Physics {
  /**
   * @param {pc.Application} app
   */
 
  static init(app) {
    CollisionDetector.instance.init([
      {
        tag         : CollisionTag.Snake,
        collideTags: [CollisionTag.Wall, CollisionTag.Item, CollisionTag.Cube],
      },
    ]);

    app.on("update", this.update, this);
  }

  static update() {
    CollisionDetector.instance.update();
  }

  static reset() { 
    CollisionDetector.instance.reset();
  }
}
