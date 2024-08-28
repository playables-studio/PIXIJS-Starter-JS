import NetworkInitializer from './NetworkInitializer';

class UnityInitializer extends NetworkInitializer {
    initialize() {
        console.log('Initializing playable ad for Unity');
        this.loadAssets();
        this.startPlayable();
    }

    loadAssets() {
        console.log('Loading assets for Unity');
    }

    startPlayable() {
        console.log('Starting playable ad for Unity');
    }
}

export default UnityInitializer;
