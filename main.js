const { app, BrowserWindow, nativeImage } = require('electron')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "HouseLearning",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.loadURL('https://houselearning.org')

  mainWindow.webContents.on('page-favicon-updated', async (event, favicons) => {
    if (favicons && favicons.length > 0) {
      try {
        const iconImage = await nativeImage.fromURL(favicons)
        mainWindow.setIcon(iconImage)
      } catch (error) {
        console.error('Failed to automatically load favicon:', error)
      }
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
