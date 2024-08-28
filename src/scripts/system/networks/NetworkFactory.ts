import AppLovinInitializer from './AppLovinInitializer';

const networkInitializers: { [key: string]: { new(): NetworkInitializer } } = {
    appLovin: AppLovinInitializer,
};

class NetworkFactory {
    static createInitializer(networkName: string): NetworkInitializer {
        const InitializerClass = networkInitializers[networkName];

        if (!InitializerClass) {
            throw new Error(`Network "${networkName}" is not supported.`);
        }

        return new InitializerClass();
    }
}

export default NetworkFactory;
