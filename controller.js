const Nes = require("@hapi/nes");
const ButtonManager = require("./src/ButtonManager");
const BuzzerManager = require("./src/BuzzerManager");

const client = new Nes.Client("ws://Johns-MacBook-Pro.local:3001");
const start = async () => {
  await client.connect();

  const buttonManager = new ButtonManager(client);
  const buzzer = new BuzzerManager();

  client.onUpdate = update => {
    console.log(update);
    buzzer.processUpdate(update);
  };

  client.onDisconnect = (willReconnect, log) => {
    console.log({ willReconnect, log });
    buttonManager.setConnected(false);
    if (!willReconnect) {
      process.exit(1);
    }
  };

  client.onConnect = () => {
    buttonManager.setConnected(true);
  };

  //   client.request({
  //     method: "POST",
  //     path: "update",
  //     payload: JSON.stringify({
  //       action: "newGame",
  //       gameInfo: { home: "reef", away: "dad", duration: 20 }
  //     })
  //   });
};

start();
