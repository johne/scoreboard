const Gpio = require("onoff").Gpio;

class BuzzerManager {
  construbtor() {
    this.buzzer = new Gpio(17, "out");
  }

  _buzzIt() {
    // this.timer = undefined;
    // this.buzzer.writeSync(1);
    // setTimeout(() => {
    //   this.buzzer.writeSync(0);
    // }, 300);
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
