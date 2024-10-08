import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from './Loader';
import { ScenesManager } from './ScenesManager';
import PlayableAnalytic from './PlayableAnalytic';
import { MarketHelper, MarketConfig } from './helpers/MarketHelper';
import NetworkFactory from './networks/NetworkFactory';
import SessionHelper from "./helpers/SessionHelper";

interface Config {
    apiUrl: string;
    defaultAdNetwork: string;
    projectName: string;
    projectId: string;
    [key: string]: any;
}

class Application {
    public config!: Config;
    public app!: PIXI.Application;
    public sessionId!: string;
    public projectId!: string;

    private scenes!: ScenesManager;
    private loader!: Loader;
    private analytics!: PlayableAnalytic;
    private marketHelper!: MarketHelper;
    private sessionHelper!: SessionHelper;
    private adNetwork!: NetworkInitializer; // Consider defining a more specific type for adNetwork

    run(config: Config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;
        this.projectId = config.projectId;
        this.sessionHelper = SessionHelper.getInstance();
        this.sessionId = this.sessionHelper.getSessionId();

        const networkName = config.defaultAdNetwork; // or process.env.AD_NETWORK

        this.analytics = PlayableAnalytic.getInstance(config.apiUrl, networkName);
        this.marketHelper = MarketHelper.getInstance(networkName, this.analytics);
        this.adNetwork = NetworkFactory.createInitializer(networkName);

        const marketConfig: MarketConfig = {
            gotoMarketAfterRetryNum: 5,
            gotoMarketAfterTime: 10,
            gotoMarketClickNum: 10,
            gotoMarketUpClickNum: 10
        };

        this.marketHelper.initMarketFunctions(marketConfig);
        this.adNetwork.initialize();


        this.app = new PIXI.Application({
            resizeTo: window,

        });

        document.body.appendChild(this.app.view);

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        this.loader = new Loader(this.app.loader, { loader: this.config.loader });
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
