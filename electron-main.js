 
// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
// const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname,'preload.js')
    },
  });

  // insteading of loading index.html, loading the react url 
  mainWindow.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});