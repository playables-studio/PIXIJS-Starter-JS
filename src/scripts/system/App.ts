import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from './Loader';
import { ScenesManager } from './ScenesManager';
import PlayableAnalytic from './PlayableAnalytic';
import MarketHelper from './helpers/MarketHelper';
import NetworkFactory from './networks/NetworkFactory';

interface Config {
    apiUrl: string;
    defaultAdNetwork: string;
    [key: string]: any;
}

class Application {
    public config!: Config;
    public app!: PIXI.Application;
   
    private scenes!: ScenesManager;
    private loader!: Loader;
    private analytics!: PlayableAnalytic;
    private marketHelper!: MarketHelper;
    private adNetwork: any; // Consider defining a more specific type for adNetwork

    run(config: Config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.adNetwork = config.defaultAdNetwork; // or process.env.AD_NETWORK

        this.analytics = PlayableAnalytic.getInstance(config.apiUrl, this.adNetwork);
        this.marketHelper = new MarketHelper(this.adNetwork, this.analytics);
        this.adNetwork = NetworkFactory.createInitializer(this.adNetwork);

        this.adNetwork.initialize();

        const options = {
            resizeTo: window
        }

        this.app = new PIXI.Application(options);

        document.body.appendChild(this.app.view);

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

         this.loader = new Loader(this.app.loader, { loader :this.config.loader});
        this.loader.preload().then(() => this.start());
    }

    res(key: string): PIXI.Texture | undefined {
        return this.loader.resources[key]?.texture;
    }

    sprite(key: string): PIXI.Sprite {
        const texture = this.res(key);
        if (!texture) {
            throw new Error(`Resource ${key} not found`);
        }
        return new PIXI.Sprite(texture);
    }

    start() {
        this.scenes.start("Game");
    }
}

export const App = new Application();
