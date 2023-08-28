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
  [D_RIGHT]: "subtract5Seconds",
  [D_LEFT]: "add5Seconds",
  [D_UP]: "add20Seconds",
  [D_DOWN]: "subtract20Seconds",
  [A]: "playPause",
  [B]: "playPause",
  [X]: "shotClock",
  [Y]: "shotClock"
};

class RemoteManager {
  static tealTag = "teal";
  static yellowTag = "yellow";

  constructor(gameManager) {
    this.gameManager = gameManager;
    this.keyboards = {};
    this._connectWatcher();
  }

  _connectWatcher() {
    fs.watch("/dev/input", (event, filename) => {
      if (event === "rename") {
        this.keyboards[filename] = null;
      } else if (this.keyboards[filename] === null) {
        this._setupKeyboard(filename);
      }
    });
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
      .find(
        group =>
          group["N: Name"] === '"8BitDo Zero 2 gamepad Keyboard"' &&
          group["H: Handlers"].includes("event2")
      );

    if (info && [TEAL_REMOTE, YELLOW_REMOTE].includes(info["U: Uniq"])) {
      this._watchKeyboard(filename, info["U: Uniq"]);
    }
  }

  _watchKeyboard(filename, address) {
    const input = new InputEvent(`/dev/input/${filename}`);

    const keyboard = new InputEvent.Keyboard(input);

    keyboard.on("keyup", data => this._processKey(data, address));
    this.keyboards[filename] = keyboard;
  }

  async _scoreAction(action, address) {
    const currentGame = await this.gameManager.getCurrentGame();

    const currentColor = address === TEAL_REMOTE ? "teal" : "yellow";

    const controllerPosition = currentGame.controllers[currentColor];

    return `${controllerPosition}${action}`;
  }

  async _processKey(data, address) {
    let action = actionMap[data.code];

    if (!action) {
      // ignore different key
      return;
    }

    if (action === "Score" || action === "MinusScore") {
      action = await this._scoreAction(action, address);
    }

    this.gameManager.handleMessage({ action });
  }
}

module.exports = RemoteManager;
