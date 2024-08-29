import { Game } from './Game';
import { Tools } from "../system/Tools";

interface Asset {
    key: string;
    data: any; // This can be refined if you know the specific type of assets (e.g., string for URLs)
}

// Define the interface for the Config object
interface ConfigType {
    loader: Asset[];
    scenes: {
        [key: string]: new () => any; // Assuming each scene is a class that can be instantiated
    };
    apiUrl: string;
    defaultAdNetwork: string;
    projectName: string;
    projectId: string;
}

export const Config: ConfigType = {
    projectName: "",
    projectId: "",
    defaultAdNetwork: 'appLovin',
    apiUrl: 'https://playables.studio',
    loader: Tools.massiveRequire(require.context('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        'Game': Game
    },
};
