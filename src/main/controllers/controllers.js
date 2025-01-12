import { enableHotspot } from '../services/hotspotService.js';
import { createTerminal, sendToTerminal, resizePty } from '../services/terminal.js';

export const turnOnHotspot = async (event, ssid, password) => {
    try {
        const result = await enableHotspot(ssid, password);
        return { success: true, message: result };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

let terminalInstance;

export const handleTerminalData = (mainWindow, data) => {
  if (!terminalInstance) {
    terminalInstance = createTerminal(mainWindow);
  }
  sendToTerminal(terminalInstance, data);
};

export const resizeTerminal = (cols, rows) => {
  if (terminalInstance) {
    resizePty(terminalInstance, cols, rows);
  }
};
