import { Color, Vec3 } from "playcanvas";
import { Game } from "../game";

export class Util {
  static linear(a, b, percent) {
    return a + (b - a) * percent;
  }

  static easeIn(a, b, percent) {
    return a + (b - a) * percent ** 2;
  }

  static easeOut(a, b, percent) {
    return a + (b - a) * (1 - (1 - percent) ** 2);
  }

  static easeInOut(a, b, percent) {
    return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
  }

  static copyObject(src, dst = {}) {
    Object.keys(src).forEach((key) => {
      dst[key] = src[key];
    });
    return dst;
  }

  static sign(num) {
    return num < 0 ? -1 : 1;
  }

  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * @summary Return random element from list
   * @param {Array} list
   */
  static randomFromList(list) {
    if (list && list.length > 0) {
      let randomIndex = this.randomInt(0, list.length - 1);
      return list[randomIndex];
    }
    else {
      return -1;
    }
  }

  static randomVector(vecMin, vecMax, out = new Vec3()) {
    out.x = Util.random(vecMin.x, vecMax.x);
    out.y = Util.random(vecMin.y, vecMax.y);
    out.z = Util.random(vecMin.z, vecMax.z);
    return out;
  }

  /**
   * @returns Angle of vector in degree
   */
  static getAlpha(x, y) {
    if (y === 0) {
      return 90;
    }
    return this.toDegree(Math.atan(Math.abs(x) / Math.abs(y)));
  }

  static toDegree(radian) {
    return radian * 180 / Math.PI;
  }

  static toRadian(degree) {
    return degree * Math.PI / 180;
  }

  static createColor(r = 255, g = 255, b = 255, a = 1) {
    return new Color(r / 255, g / 255, b / 255, a);
  }

  static setUpEffectModel(entity) {
    entity.model.castShadows = false;
    entity.model.castShadowsLightmap = false;
    entity.model.receiveShadows = false;
  }

  static setModelOpacity(entity, opacity) {
    entity.model.meshInstances.forEach((mesh) => {
      mesh.material.opacity = opacity;
      mesh.material.update();
    });
  }

  static setModelMaterial(entity, material, index = 0) {
    entity.model.meshInstances[index].material = material;
  }

  static registerOnTouch(element, callback, scope) {
    element.useInput = true;
    element.on("mousedown", callback, scope);
    element.on("touchstart", callback, scope);
  }

  static registerOnceTouch(element, callback, scope) {
    element.useInput = true;
    element.once("mousedown", callback, scope);
    element.once("touchstart", callback, scope);
  }
}
