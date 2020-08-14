const {ipcRenderer} = window.require('electron');

export const openDevTool = () => {
    ipcRenderer.send('open-dev-tool');
}