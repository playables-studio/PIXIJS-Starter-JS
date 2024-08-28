import * as PIXI from "pixi.js";
import { App } from "./App";

// Define an interface for scenes that your ScenesManager will manage
interface Scene {
    container: PIXI.Container;
    remove(): void;
}

export class ScenesManager {
    public container: PIXI.Container;
    public scene: Scene | null;

    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.scene = null;
    }

    start(sceneName: string): void {
        if (this.scene) {
            this.scene.remove();
        }

        const SceneClass = App.config.scenes[sceneName];
        if (!SceneClass) {
            throw new Error(`Scene ${sceneName} does not exist in the configuration.`);
        }

        this.scene = new SceneClass();
        this.container.addChild(this.scene!.container);
    }
}
