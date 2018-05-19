import jes from "./jesFtp";
import { newFile, openFilePicker, saveFile } from "./nativeDialogs";
const { app } = require("electron").remote;

export default function generateMenuTemplate() {
  const template: any[] = [
    {
      label: "File",
      submenu: [
        {
          accelerator: "CmdOrCtrl+N",
          click() {
            newFile();
          },
          label: "New File"
        },
        {
          type: "separator"
        },
        {
          accelerator: "CmdOrCtrl+O",
          click() {
            openFilePicker();
          },
          label: "Open File"
        },
        {
          type: "separator"
        },
        {
          accelerator: "CmdOrCtrl+S",
          click() {
            saveFile(true);
          },
          label: "Save"
        },
        {
          accelerator: "Shift+CmdOrCtrl+S",
          click() {
            saveFile(false);
          },
          label: "Save As"
        },
        {
          type: "separator"
        },
        {
          role: "minimize"
        },
        {
          accelerator: "Shift+CmdOrCtrl+W",
          label: "Close Window",
          role: "close"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          role: "undo"
        },
        {
          role: "redo"
        },
        {
          type: "separator"
        },
        {
          role: "cut"
        },
        {
          role: "copy"
        },
        {
          role: "paste"
        },
        {
          role: "pasteandmatchstyle"
        },
        {
          role: "delete"
        },
        {
          role: "selectall"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "reload"
        },
        {
          role: "toggledevtools"
        },
        {
          type: "separator"
        },
        {
          role: "resetzoom"
        },
        {
          role: "zoomin"
        },
        {
          role: "zoomout"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen"
        }
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "View on GitHub",
          click() {
            require("electron").shell.openExternal(
              "https://github.com/open-mainframe/keypunch"
            );
          }
        },
        {
          label: "Kill FTP",
          click() {
            jes.disconnect();
          }
        }
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      // label: "Kludge",
      submenu: [
        {
          role: "about"
        },
        {
          type: "separator"
        },
        {
          role: "services",
          submenu: []
        },
        {
          type: "separator"
        },
        {
          role: "hide"
        },
        {
          role: "hideothers"
        },
        {
          role: "unhide"
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]
    });
    // Edit menu.
    template[1].submenu.push(
      {
        type: "separator"
      },
      {
        label: "Speech",
        submenu: [
          {
            role: "startspeaking"
          },
          {
            role: "stopspeaking"
          }
        ]
      }
    );
    // Window menu.
    template[3].submenu = [
      {
        accelerator: "CmdOrCtrl+W",
        label: "Close",
        role: "close"
      },
      {
        accelerator: "CmdOrCtrl+M",
        label: "Minimize",
        role: "minimize"
      },
      {
        label: "Zoom",
        role: "zoom"
      },
      {
        type: "separator"
      },
      {
        label: "Bring All to Front",
        role: "front"
      }
    ];
  }
  return template;
}
