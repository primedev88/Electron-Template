import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const xterm = useRef(null);

  useEffect(() => {
    // Initialize xterm.js
    xterm.current = new Terminal({
      cursorBlink: true,
      disableStdin: false, // Allow input
      theme: { background: '#1d1f21' }, // Optional: Set a dark background
    });

    xterm.current.open(terminalRef.current);

    // Send data to the backend when typing
    xterm.current.onData((data) => {
      window.electronAPI.sendToTerminal(data); // Forward input to the backend
    });

    // Listen for output from the backend
    window.electronAPI.onTerminalOutput((data) => {
      xterm.current.write(data); // Render output from the backend
    });
 
    // Handle resizing
    const resizeObserver = new ResizeObserver(() => {
      const cols = Math.floor(
        terminalRef.current.offsetWidth / xterm.current._core._renderService.dimensions.actualCellWidth
      );
      const rows = Math.floor(
        terminalRef.current.offsetHeight / xterm.current._core._renderService.dimensions.actualCellHeight
      );
      window.electronAPI.resizeTerminal(cols, rows);
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      xterm.current.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalComponent;
