import { ipcMain } from 'electron';
import { turnOnHotspot,handleTerminalData, resizeTerminal } from '../controllers/controllers.js';


export const setupRoutes = (mainWindow) => {
    ipcMain.handle('turn-on-hotspot', turnOnHotspot);
    ipcMain.handle('terminal-data', (event, data) => handleTerminalData(mainWindow, data));
    ipcMain.handle('terminal-resize', (event, cols, rows) => resizeTerminal(cols, rows));
};
