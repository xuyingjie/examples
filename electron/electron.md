
# Main Process

### BrowserWindow
> Create and control browser windows.

# Renderer Process

### <webview>
> Use the webview tag to embed ‘guest’ content (such as web pages) in your Electron app. Unlike an iframe, the webview runs in a separate process than your app.
- `<webview>.send`
- `ipcRenderer.sendToHost`

### window.open
> When window.open is called to create a new window in a web page, a new instance of BrowserWindow will be created for the url and a proxy will be returned to window.open to let the page have limited control over it.
- `win.postMessage`
- `window.opener.postMessage`




# Synopsis

Main Process
Renderer Process

// ipc
ipcMain.on                          ipcRenderer.send
window.webContents.send             ipcRenderer.on

// RPC
webContents.executeJavaScript       remote

// remote
remote.require

// require 会自动用一个匿名函数包裹
```
(function (exports, require, module, __filename, __dirname, process, global) {
});
```


# Application Packaging (reference vscode)

## Generating asar Archive
An asar archive is a simple tar-like format that concatenates files into a single file.
Electron can read arbitrary files from it without unpacking the whole file.
Not an encryption scheme.

## electron-packager

## other electron app release process

- atom way
	`grunt-electron-installer` (https://github.com/atom/atom/blob/master/build/Gruntfile.coffee)
		使用 Squirrel.Windows 打包工具，效果像chrome一键安装

- vscode way
	- gulp-atom-electron (https://github.com/Microsoft/vscode/blob/master/build/gulpfile.vscode.js)
	- Inno (https://github.com/Microsoft/vscode/blob/master/build/gulpfile.vscode.win32.js)

```
var gulp = require('gulp');
var del = require('del');  // https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
var uglify = require('gulp-uglify');
var electron = require('gulp-atom-electron');  // https://github.com/joaomoreno/gulp-atom-electron
```
