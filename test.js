const Nes = require("@hapi/nes");

const client = new Nes.Client("ws://ellis-scoreboard.local:3000");

client.request({
  method: "POST",
  path: "update",
  payload: JSON.stringify({
    action: "playPause"
  })
});
