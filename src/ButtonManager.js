const Gpio = require("onoff").Gpio;

class ButtonManager {
  constructor(client) {
    this.client = client;

    this.homeScore = this._setupButtom(16, (err, value) => {
      this._handleButton(err, value, "homeScore");
    });
    this.awayScore = this._setupButtom(20, (err, value) => {
      this._handleButton(err, value, "awayScore");
    });
    this.playPause = this._setupButtom(21, (err, value) => {
      this._handleButton(err, value, "playPause");
    });

    this.pressed = {};
  }

  _setupButtom(gpio, callback) {
    const button = new Gpio(gpio, "in", "both", { debounceTimeout: 10 });
    button.watch(callback);
    return button;
  }

  _handleButton(err, value, action) {
    if (err) {
      console.error("button error", err);
      return;
    }

    console.log("handling a button press", {
      pressed: this.pressed,
      value,
      action
    });

    const released = this.pressed[action] === 1 && value === 0;
    this.pressed[action] = value;

    if (released) {
      console.log("posting action", {
        pressed: this.pressed,
        value,
        action
      });
      this.client.request({
        method: "POST",
        path: "update",
        payload: JSON.stringify({
          action: action
        })
      });
    }
  }
}

module.exports = ButtonManager;
