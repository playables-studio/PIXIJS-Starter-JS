import * as PIXI from 'pixi.js';

interface LoaderAsset {
    key: string;
    data: any; // This can be refined if you know the specific type of assets (e.g., string for URLs)
}

interface LoaderConfig {
    loader: LoaderAsset[];
}

export class Loader {
    private loader: PIXI.Loader;
    private config: LoaderConfig;
    public resources: { [key: string]: PIXI.LoaderResource };

    constructor(loader: PIXI.Loader, config: LoaderConfig) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    preload(): Promise<void> {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));

            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                this.loader.add(key, asset.data.default);
            }
        }

        return new Promise<void>((resolve) => {
            this.loader.load((loader, resources) => {
                this.resources = resources;
                resolve();
            });
        });
    }
}
