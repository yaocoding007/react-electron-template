const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const log = require("electron-log");
const isDev = require("electron-is-dev");

log.transports.file.level = "silly";

let win = null;

// const isWindow = process.platform === "win32";

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

//当所有窗口都被关闭后退出
app.on("window-all-closed", () => {
	// 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
	// 否则绝大部分应用及其菜单栏会保持激活。
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// 在macOS上，当单击dock图标并且没有其他窗口打开时，
	// 通常在应用程序中重新创建一个窗口。
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.on("open-dev-tool", () => {
    win && win.webContents.openDevTools();
})



function createWindow() {
	// 创建浏览器窗口
	log.info("create-window");
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	if(isDev) {
		win.loadURL(`http://127.0.0.1:3000/index.html`)
	}else {
		const local_url = url.format({
			pathname: path.join(__dirname, "../build/index.html"),
			protocol: "file:",
			slashes: true,
		});
		log.info('createWindow local_url ---->', local_url);
		win.loadURL(local_url);
	}
	// 打开开发者工具
	isDev && win.webContents.openDevTools();
}