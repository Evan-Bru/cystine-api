const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

// START MCP
ipcMain.on("start-mcp", () => {
    spawn("cmd", ["/c", "node cli.js start all"], {
        cwd: __dirname,
        detached: true,
        stdio: "ignore"
    }).unref();
});