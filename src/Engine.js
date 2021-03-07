const Electron = require('electron');
const Path = require('path');

const {Client} = require('discord-rpc');
const RPC = new Client({transport: 'ipc'});
let mainWindow;
function Main(){
    mainWindow = new Electron.BrowserWindow({
        resizable: false,
        width: 500,
        height: 500,
        icon: Path.resolve(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: Path.resolve(__dirname, 'Front/preload.js')
        },
    });

    mainWindow.loadURL(Path.resolve(__dirname, 'Front/view.html'))
    Electron.Menu.setApplicationMenu(null)
    // mainWindow.webContents.openDevTools()

    Electron.ipcMain.on('OK', (event, data) => {
        RPC.login({clientId: data.id}).then(c => {
            c.setActivity(data.info)
            mainWindow.webContents.send('res', {res: 200})
        })
    })
}

Electron.app.whenReady().then(Main)