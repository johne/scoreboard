const Gpio = require("pigpio").Gpio;

class BuzzerManager {
  construbtor() {
    this.buzzer1 = new Gpio(19, Gpio.OUTPUT);
    this.buzzer2 = new Gpio(26, Gpio.OUTPUT);

    this.timer = setTimeout(() => {
      this._buzzIt();
    }, 20000);
  }

  _buzzIt() {
    console.log("buzzing");
    this.timer = undefined;
    this.buzzer1.hardwarePwmWrite(261626, 1000000);
    this.buzzer2.hardwarePwmWrite(261, 1000000 / 2);
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
