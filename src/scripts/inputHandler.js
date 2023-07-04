import { InputManager, InputManagerEvent } from "../systems/input/inputManager";
import { Script } from "../systems/script/script";

export const InputHandler = Script.createScript({
  name: "inputHandler",

  initialize() {
    InputManager.emitter.on(InputManagerEvent.PointerDown, this._onPointerDown, this);
    InputManager.emitter.on(InputManagerEvent.PointerMove, this._onPointerMove, this);
    InputManager.emitter.on(InputManagerEvent.PointerUp, this._onPointerUp, this);
  },

  _onPointerDown(event) {
    this.enabled && this.fire(InputHandlerEvent.PointerDown, event);
  },

  _onPointerMove(event) {
    this.enabled && this.fire(InputHandlerEvent.PointerMove, event);
  },

  _onPointerUp(event) {
    this.enabled && this.fire(InputHandlerEvent.PointerUp, event);
  },
});

export const InputHandlerEvent = Object.freeze({
  PointerDown: "inputHandler:pointerdown",
  PointerMove: "inputHandler:pointermove",
  PointerUp: "inputHandler:pointerup",
});
