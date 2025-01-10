import { ipcMain } from 'electron';
import { turnOnHotspot } from '../controllers/controllers.js';

export const setupRoutes = () => {
    ipcMain.handle('turn-on-hotspot', turnOnHotspot);
};
