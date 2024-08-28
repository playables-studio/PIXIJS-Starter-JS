class ResponsiveHelper {
    constructor(type, resizeCallback) {
      this.type = type;
      this.resizeCallback = resizeCallback;
    }
  
    resize() {
      let width = window.innerWidth;
      let height = window.innerHeight;
  
      if (this.type === "moloco") {
        ({ width, height } = this.resizeMoloco());
      } else if (window.mraid) {
        let size = window.mraid.getMaxSize() || window.mraid.getScreenSize();
        width = size.width;
        height = size.height;
      }
  
      this.resizeCallback(width, height);
    }
  
    resizeMoloco() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  
    startResponsive() {
      window.addEventListener("resize", this.resize.bind(this));
      window.addEventListener("orientationchange", this.resize.bind(this));
      this.resize();
    }
  }
  
  export default ResponsiveHelper;
  