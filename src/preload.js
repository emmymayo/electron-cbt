// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const {contextBridge, autoUpdater} = require('electron');

const {getUser, authenticateUser, updateUser, updatePassword} = require('./models/users');

contextBridge.exposeInMainWorld('api', {
    getUser:            getUser,
    authenticateUser:   authenticateUser,
    updateUser:         updateUser,
    updatePassword:     updatePassword
});