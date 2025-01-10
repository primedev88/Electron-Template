import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const customAPI = {
  // Define your custom APIs here
  turnOnHotspot: (ssid, password) => ipcRenderer.invoke('turn-on-hotspot', ssid, password),
  
  sendInput: (data) => ipcRenderer.send('terminal-input', data),
  onOutput: (callback) => ipcRenderer.on('terminal-output', (_, data) => callback(data)),

};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// attach them directly to the global `window` object.
if (process.contextIsolated) {
  try {
    // Expose Electron's built-in APIs
    contextBridge.exposeInMainWorld('electron', electronAPI);

    // Expose custom APIs
    contextBridge.exposeInMainWorld('electronAPI', customAPI);
  } catch (error) {
    console.error('Error exposing APIs with contextBridge:', error);
  }
} else {
  console.warn('Context isolation is disabled. Exposing APIs directly to the global window.');

  // Attach APIs directly to the global window object
  window.electron = electronAPI;
  window.electronAPI = customAPI;
}
