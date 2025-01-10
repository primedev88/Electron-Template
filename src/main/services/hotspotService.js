import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

export const enableHotspot = async (ssid, password) => {
    const adapterName = 'wlo1'; // Replace with dynamic logic if needed
    await execAsync('nmcli radio wifi on');
    await execAsync(`nmcli device wifi hotspot ifname ${adapterName} con-name Hotspot ssid ${ssid} password ${password}`);
    return 'Hotspot turned on successfully!';
};
