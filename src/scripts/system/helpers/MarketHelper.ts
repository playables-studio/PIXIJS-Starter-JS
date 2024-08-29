import PlayableAnalytic from "../PlayableAnalytic";

interface MarketConfig {
    gotoMarketClickNum: number;
    gotoMarketUpClickNum: number;
    gotoMarketAfterTime: number;
    gotoMarketAfterRetryNum: number;
    gotoMarketAfterTimeAuto?: number; // Optional because it might not always be provided
}

class MarketHelper {
    private static instance: MarketHelper;
    
    private type: string;
    private analytics: PlayableAnalytic;
    private curGoToMarketClickNum: number;
    private curGoToMarketClickUpNum: number;
    private curGoToMarketRetryNum: number;
    private gotoMarketClickNum: number = 0;
    private gotoMarketUpClickNum: number = 0;
    private gotoMarketAfterTime: number = 0;
    private gotoMarketAfterRetryNum: number = 0;
    private startTime: number;
    private gamePaused: boolean;

    // Private constructor to prevent direct instantiation
    private constructor(type: string, analytics: PlayableAnalytic) {
        this.type = type;
        this.analytics = analytics;
        this.curGoToMarketClickNum = 0;
        this.curGoToMarketClickUpNum = 0;
        this.curGoToMarketRetryNum = 0;
        this.startTime = performance.now();
        this.gamePaused = false; // Assuming a default value; adjust as needed
    }

    // Public static method to get the singleton instance
    public static getInstance(type: string, analytics: PlayableAnalytic): MarketHelper {
        if (!MarketHelper.instance) {
            MarketHelper.instance = new MarketHelper(type, analytics);
        }
        return MarketHelper.instance;
    }

    public initMarketFunctions(config: MarketConfig): void {
        this.gotoMarketClickNum = Number(config.gotoMarketClickNum);
        this.gotoMarketUpClickNum = Number(config.gotoMarketUpClickNum);
        this.gotoMarketAfterTime = Number(config.gotoMarketAfterTime);
        this.gotoMarketAfterRetryNum = Number(config.gotoMarketAfterRetryNum);

        document.body.addEventListener("touchstart", this.handleMarketClick.bind(this));
        document.body.addEventListener("touchend", this.handleMarketClickUp.bind(this));

        this.setupAutoMarket(config);
    }

    private setupAutoMarket(config: MarketConfig): void {
        const checkInterval = (): void => {
            if (!this.gamePaused && config.gotoMarketAfterTimeAuto && this.timePassed() > config.gotoMarketAfterTimeAuto) {
                this.openMarket();
            }
            requestAnimationFrame(checkInterval);
        };
        requestAnimationFrame(checkInterval);
    }

    private handleMarketClick(event: TouchEvent): void {
        this.curGoToMarketClickNum++;

        this.analytics.newDesignEvent({
            goToMarketClick: this.curGoToMarketClickNum,
        });

        if (this.curGoToMarketClickNum >= this.gotoMarketClickNum) {
            this.openMarket();
        }
    }

    private handleMarketClickUp(event: TouchEvent): void {
        this.curGoToMarketClickUpNum++;
        if (this.curGoToMarketClickUpNum >= this.gotoMarketUpClickNum) {
            this.openMarket();
        }
    }

    private openMarket(): void {
        this.analytics.newDesignEvent({
            openMarket: "1"
        });

        console.log("Opening market for type: ", this.type);
    }

    private timePassed(): number {
        return performance.now() - this.startTime;
    }
}

export { MarketHelper, MarketConfig};
