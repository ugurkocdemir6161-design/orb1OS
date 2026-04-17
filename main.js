const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // İframe kısıtlamalarını kaldır
      allowRunningInsecureContent: true
    },
    frame: false,
    transparent: false,
    backgroundColor: '#000000'
  });

  mainWindow.loadFile('orb1OS_ultra.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// İçerik güvenliği kısıtlamalarını kaldır
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, url) => {
    // Tüm navigasyonlara izin ver
  });

  contents.setWindowOpenHandler(({ url }) => {
    // Yeni pencere açma yerine aynı pencerede aç
    return { action: 'deny' };
  });
});

// İframe için webSecurity kapat
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');
