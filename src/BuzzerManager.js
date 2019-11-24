const Gpio = require("pigpio").Gpio;

class BuzzerManager {
  construbtor() {}

  _buzzIt() {
    console.log("buzzing");

    // todo put it here

    setTimeout(() => {
      console.log("stopping");
      this.buzzer1.hardwarePwmWrite(0, 0);
      this.buzzer2.hardwarePwmWrite(0, 0);
    }, 300);
  }

  processUpdate(update) {
    const { paused, end } = update;
    const now = new Date().getTime();

    this.timer && clearTimeout(this.timer);

    if (!paused && end < now) {
      this.timer = setTimeout(() => {
        this._buzzIt();
      }, end - now);
    }
  }
}

module.exports = BuzzerManager;
