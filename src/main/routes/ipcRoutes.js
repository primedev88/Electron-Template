import { ipcMain } from 'electron';
import { turnOnHotspot } from '../controllers/controllers.js';

const pty = require('node-pty');

export const setupRoutes = (mainWindow) => {
    ipcMain.handle('turn-on-hotspot', turnOnHotspot);

    const ptyProcess = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME, // Current working directory
        env: process.env, // Environment variables
    });

    // Handle terminal output and send it to the renderer
    ptyProcess.on('data', (data) => {
        mainWindow.webContents.send('terminal-output', data);
    });

    // Handle input from the renderer and write it to the terminal
    ipcMain.on('terminal-input', (event, input) => {
        ptyProcess.write(input);
    });

    // Resize terminal when the renderer requests
    ipcMain.on('terminal-resize', (event, cols, rows) => {
        ptyProcess.resize(cols, rows);
    });

};
