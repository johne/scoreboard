const Gpio = require("onoff").Gpio;

class ButtonManager {
  constructor(client) {
    this.client = client;

    this.homeScore = this._setupButtom(17, (err, value) => {
      this._handleButton(err, value, "homeScore");
    });
    this.awayScore = this._setupButtom(27, (err, value) => {
      this._handleButton(err, value, "awayScore");
    });
    this.playPause = this._setupButtom(22, (err, value) => {
      this._handleButton(err, value, "playPause");
    });

    this.led = new Gpio(25, "out");
    this.led.writeSync(1);

    this.ledValue = 1;

    this.interval = setInterval(() => {
      this.led.writeSync(this.ledValue);
      this.ledValue === 0 ? 1 : 0;
    }, 50);

    this.pressed = {};
  }

  _setupButtom(gpio, callback) {
    console.log("setting up button", { gpio });
    const button = new Gpio(gpio, "in", "both", { debounceTimeout: 10 });
    button.watch(callback);
    console.log("set up button", { gpio });
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
