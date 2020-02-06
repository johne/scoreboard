const player = require("node-wav-player");

class BuzzerManager {
  construbtor() {}

  _buzzIt() {
    console.log("buzzing");
    const path = `${__dirname}/../ui/scoreboard/public/air-horn.wav`;

    player
      .play({
        path
      })
      .then(() => {
        console.log("The wav file started to be played successfully.");
      })
      .catch(error => {
        console.error(error);
      });
  }

  processUpdate(update) {
    console.log("update from server");
    console.log(update);
    console.log(Date.now());

    const { paused, end } = update;
    const now = Date.now();

    this.timer && clearTimeout(this.timer);

    if (!paused && end > now) {
      console.log("setting timeout");
      this.timer = setTimeout(() => {
        console.log("timeout!!!");
        this._buzzIt();
      }, end - now);
    }
  }
}

module.exports = BuzzerManager;
