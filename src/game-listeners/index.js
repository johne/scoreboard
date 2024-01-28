const LedManager = require("./LedManager");

const listeners = [new LedManager()];

const triggerListeners = (message, currentGame) => {
  listeners.forEach(async listener => {
    try {
      await listener.handleMessage(message, currentGame);
    } catch (err) {
      console.log("listener handle error", err);
    }
  });
};

const triggerGameOver = currentGame => {
  listeners.forEach(async listener => {
    try {
      await listener.gameOver(currentGame);
    } catch (err) {
      console.log("listener game over error", err);
    }
  });
};

module.exports = { triggerListeners, triggerGameOver };
