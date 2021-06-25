const { app, BrowserWindow, ipcMain } = require("electron");

const setup = () => {
  ipcMain.on("minimize", () => {
    BrowserWindow.getFocusedWindow().minimize();
  });

  ipcMain.on("quit", () => {
    app.quit();
  });
};

module.exports = {
  setup,
};
