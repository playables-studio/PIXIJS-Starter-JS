import * as PIXI from "pixi.js";
import { App } from "./App";

export class Scene {
    public container: PIXI.Container;

    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.create();
        App.app.ticker.add(this.update, this);
    }

    create(): void {}

    update(delta: number): void {}

    destroy(): void {}

    remove(): void {
        App.app.ticker.remove(this.update, this);
        this.destroy();
    }
}
