import NetworkInitializer from './NetworkInitializer';

class AppLovinInitializer extends NetworkInitializer {
    initialize() {
        console.log('Initializing playable ad for AppLovin');
        this.loadAssets();
        this.startPlayable();
    }

    loadAssets() {
        console.log('Loading assets for AppLovin');
    }

    startPlayable() {
        console.log('Starting playable ad for AppLovin');
    }
}

export default AppLovinInitializer;
