const Nes = require("@hapi/nes");

const client = new Nes.Client("ws://Johns-MacBook-Pro.local:3001");
const start = async () => {
  await client.connect();
  client.onUpdate = update => {
    console.log(update);
  };

  client.request({
    method: "POST",
    path: "update",
    payload: JSON.stringify({
      action: "newGame",
      gameInfo: { home: "reef", away: "dad", duration: 20 }
    })
  });
};

start();
