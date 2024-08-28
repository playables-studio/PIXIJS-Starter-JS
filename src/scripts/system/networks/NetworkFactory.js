// src/networks/NetworkFactory.js

import AppLovinInitializer from './AppLovinInitializer';
import UnityInitializer from './UnityInitializer';

const networkInitializers = {
    appLovin: AppLovinInitializer,
    unity: UnityInitializer,
};

class NetworkFactory {
    static createInitializer(networkName) {
        const InitializerClass = networkInitializers[networkName];

        if (!InitializerClass) {
            throw new Error(`Network "${networkName}" is not supported.`);
        }

        return new InitializerClass();
    }
}

export default NetworkFactory;
