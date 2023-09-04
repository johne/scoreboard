const fs = require("fs");
const InputEvent = require("input-event");

const TEAL_REMOTE = "E4:17:D8:AD:0F:07";
const YELLOW_REMOTE = "E4:17:D8:E0:00:00";

const L = 50;
const R = 37;
const D_RIGHT = 33;
const D_LEFT = 18;
const D_UP = 46;
const D_DOWN = 32;
const A = 34;
const B = 36;
const X = 35;
const Y = 23;

const actionMap = {
  [L]: "Score",
  [R]: "MinusScore",
  [D_UP]: "add10Seconds",
  [D_DOWN]: "remove10Seconds",
  [D_RIGHT]: "playPause",
  [D_LEFT]: "playPause",
  [A]: "shotClock",
  [B]: "shotClock",
  [X]: "shotClock",
  [Y]: "shotClock"
};

class RemoteManager {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.keyboards = {};
    this._connectWatcher();
  }

  getConnected() {
    return Object.values(this.keyboards).map(kbd =>
      kbd.address === TEAL_REMOTE
        ? "teal"
        : kbd.address === YELLOW_REMOTE
        ? "yellow"
        : ""
    );
  }

  _connectWatcher() {
    fs.watch("/dev/input", (event, filename) => {
      console.log({ event, filename });
      if (event === "rename") {
        console.log("killing keyboard" + filename);
        if (this.keyboards[filename]) {
          this.gameManager.changeConnector(
            this.keyboards[filename].color,
            false
          );
        }
        delete this.keyboards[filename];
      } else if (!this.keyboards[filename]) {
        try {
          fs.accessSync(`/dev/input/${filename}`, fs.constants.R_OK);
        } catch (err) {
          console.log("not ready?");
          return;
        }

        this.keyboards[filename] = { settingUp: true };
        console.log("setting up keyboard" + filename);
        this._setupKeyboard(filename);
      }
    });

    this._setupKeyboard("event1");
    this._setupKeyboard("event2");
    this._setupKeyboard("event3");
  }

  _setupKeyboard(filename) {
    const info = fs
      .readFileSync("/proc/bus/input/devices")
      .toString()
      .split("\n\n")
      .map(group =>
        group.split("\n").reduce((acc, line) => {
          const pair = line.split("=");
          acc[pair[0]] = pair[1];
          return acc;
        }, {})
      )
      .map(info => ({ ...info, address: info["U: Uniq"]?.toUpperCase() }))
      .find(
        group =>
          group["N: Name"] === '"8BitDo Zero 2 gamepad Keyboard"' &&
          group["H: Handlers"].includes(filename)
      );

    console.log("found info", info);

    if (info && [TEAL_REMOTE, YELLOW_REMOTE].includes(info.address)) {
      this._watchKeyboard(filename, info.address);
    }
  }

  _watchKeyboard(filename, address) {
    console.log("watching keyboard", { filename, address });
    const keyboard = new InputEvent.Keyboard(`/dev/input/${filename}`);

    const color = address === TEAL_REMOTE ? "teal" : "yellow";

    keyboard.on("keyup", data => this._processKey(data, address));
    this.keyboards[filename] = { keyboard, address, color };
    this.gameManager.changeConnector(color, true);
  }

  async _scoreAction(action, address) {
    const requests = process._getActiveRequests();
    const handles = process._getActiveHandles();

    console.log("getting current game", { requests, handles });
    const currentGame = await this.gameManager.getCurrentGame();
    console.log("got current game");

    const currentColor = address === TEAL_REMOTE ? "teal" : "yellow";

    const team = Object.keys(currentGame.teams).find(
      key => currentGame.teams[key].controller === currentColor
    );

    if (team) {
      return `${controllerPosition}${action}`;
    } else {
      console.log("team not found");
    }
  }

  async _processKey(data, address) {
    console.log("processing key", { data, address });
    let action = actionMap[data.code];

    if (!action) {
      console.log("some unknown action", data);
      return;
    }

    if (action === "Score" || action === "MinusScore") {
      action = await this._scoreAction(action, address);
    }

    if (action) {
      console.log("sending action", { action });

      this.gameManager.handleMessage({ action });
    }
  }
}

module.exports = RemoteManager;
