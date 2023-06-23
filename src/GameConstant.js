import { Vec3 } from "playcanvas";

export const GameConstant = Object.freeze({
    GAME_WIDTH: 1280,
    GAME_HEIGHT: 720,
    DEBUG_ON: false,
    DEBUG_CAMERA: true,

    PLATFORM_ANDROID: "android",
    PLATFORM_IOS: "ios",

    SCENE_SELECT: "SelectScene",
    SCENE_MAP_EDITOR: "MapEditorScene",
    SCENE_PLAY: "PlayScene",

    SCREEN_SELECT_CAR: "SelectCarScreen",
    SCREEN_MAP_EDITOR: "MapEditorScreen",
    SCREEN_PLAY: "PlayScreen",

    DEFAULT_SCALE_BOX_MIN: 0.3,
    DEFAULT_SCALE_SIZE_INCREASE: 0.3,
    DEFAULT_SCALE_BOX_MAX: 0.5,
    DEFAULT_COLOR_BOX: (0, 1, 0)

});