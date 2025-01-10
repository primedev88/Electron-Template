import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new Terminal({
        cursorBlink: true,
        cols: 80,
        rows: 24,
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff',
        },
      });
      terminal.open(terminalRef.current);

      // Send user input to the backend
      terminal.onData((data) => window.electronAPI.sendInput(data));

      // Display backend output
      window.electronAPI.onOutput((data) => terminal.write(data));

      term.current = terminal;
    }

    return () => {
      // Clean up terminal instance if unmounted
      term.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  );
};

export default TerminalComponent;
