import { App } from "../system/App";
import { Scene } from "../system/Scene";
import * as PIXI from "pixi.js";

export class Game extends Scene {
    private bg!: PIXI.Sprite;

    create(): void {
        this.createBackground();
    }

    private createBackground(): void {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }
}
