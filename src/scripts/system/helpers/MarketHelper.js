class MarketHelper {
    constructor(type, analytics) {
      this.type = type;
      this.analytics = analytics;
      this.curGoToMarketClickNum = 0;
      this.curGoToMarketClickUpNum = 0;
      this.curGoToMarketRetryNum = 0;
    }
  
    initMarketFunctions(config) {
      this.gotoMarketClickNum = Number(config.gotoMarketClickNum);
      this.gotoMarketUpClickNum = Number(config.gotoMarketUpClickNum);
      this.gotoMarketAfterTime = Number(config.gotoMarketAfterTime);
      this.gotoMarketAfterRetryNum = Number(config.gotoMarketAfterRetryNum);
  
      document.body.addEventListener("touchstart", this.handleMarketClick.bind(this));
      document.body.addEventListener("touchend", this.handleMarketClickUp.bind(this));
  
      this.setupAutoMarket(config);
    }
  
    setupAutoMarket(config) {
      // This function periodically checks conditions for auto opening the market
      const checkInterval = () => {
        if (!this.gamePaused && config.gotoMarketAfterTimeAuto && this.timePassed() > config.gotoMarketAfterTimeAuto) {
          this.openMarket();
        }
        requestAnimationFrame(checkInterval);
      };
      requestAnimationFrame(checkInterval);
    }
  
    handleMarketClick(event) {
      this.curGoToMarketClickNum++;
      if (this.curGoToMarketClickNum >= this.gotoMarketClickNum) {
        this.openMarket();
      }
    }
  
    handleMarketClickUp(event) {
      this.curGoToMarketClickUpNum++;
      if (this.curGoToMarketClickUpNum >= this.gotoMarketUpClickNum) {
        this.openMarket();
      }
    }
  
    openMarket() {
      console.log("Opening market for type: ", this.type);
      
    }
  
    timePassed() {
      return performance.now() - this.startTime;
    }
  }
  
  export default MarketHelper;
  