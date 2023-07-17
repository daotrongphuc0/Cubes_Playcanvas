import { Vec3, Color } from "playcanvas";

export const GameConstant = Object.freeze({
    GAME_WIDTH: 1280,
    GAME_HEIGHT: 720,
    DEBUG_ON: false,
    DEBUG_CAMERA: true,

    PLATFORM_ANDROID: "android",
    PLATFORM_IOS: "ios",

    SCENE_HOME: "SelectScene",
    SCENE_PLAY: "PlayScene",
    SCENE_TEST: "TestScene",

    SCREEN_HOME: "SelectCarScreen",
    SCREEN_PLAY: "PlayScreen",

    PLAYER_SPEED: 2,
    PLAYER_SPEED_UP: 4,

    DEFAULT_SCALE_BOX_MIN: 0.5,
    DEFAULT_SCALE_SIZE_INCREASE: 0.1,
    DEFAULT_SCALE_BOX_MAX: 1,
    DEFAULT_COLOR_BOX: (0, 1, 0),

    DEFAULT_LOCATION_CAMERA: new Vec3(-10, 25, 0),

    DEFAULT_HEIGHT_WALL: 1.5,
    DEFAULT_COLOR_WALL: new Color(85 / 255, 85 / 255, 85 / 255),

    HEIGHT_ITEM: 0.01,
    SIZE_ITEM: 3,

    SIZE_WALL_AROUND: 5,

    LIMIT_TIME_POS_QUEUE: 10
});