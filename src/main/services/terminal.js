import pty from 'node-pty';

export const createTerminal = (mainWindow) => {
  const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME || require('os').homedir(),
    env: process.env,
    handleFlowControl: true,
  });

  // Send output to the renderer process
  ptyProcess.on('data', (data) => {
    mainWindow.webContents.send('terminal-output', data);
  });

  return ptyProcess;
};


export const sendToTerminal = (ptyProcess, data) => {
  if (ptyProcess) {
    ptyProcess.write(data);
  }
};

export const resizePty = (ptyProcess, cols, rows) => {
  if (ptyProcess) {
    ptyProcess.resize(cols, rows);
  }
};
