import { enableHotspot } from '../services/hotspotService.js';

export const turnOnHotspot = async (event, ssid, password) => {
    try {
        const result = await enableHotspot(ssid, password);
        return { success: true, message: result };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
