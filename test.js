const player = require("node-wav-player");

const path = `${__dirname}/./ui/scoreboard/public/air-horn.wav`;

console.log(path);

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
