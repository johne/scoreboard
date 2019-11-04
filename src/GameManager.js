const DbManager = require("./DbManager");

class GameManager {
  constructor(server) {
    this.server = server;
    this.dbManager = new DbManager();
    this.pause = 10 * 1000;
  }

  async closeAllGames() {
    const now = new Date().getTime();
    const games = await this.dbManager.find({ current: true });

    games &&
      (await Promise.all(
        games.map(game => {
          game.current = false;
          return this.dbManager.update({ created: game.created }, game);
        })
      ));
  }

  async newGame(gameInfo) {
    await this.closeAllGames();
    gameInfo.created = new Date().getTime();
    gameInfo.start = new Date().getTime() + 10 * 1000; // 10 second delay
    gameInfo.end = gameInfo.start + gameInfo.duration * 60 * 1000;
    gameInfo.timeLeft = gameInfo.duration * 60 * 1000;
    gameInfo.paused = true;
    gameInfo.homeScore = gameInfo.homeScore || 0;
    gameInfo.awayScore = gameInfo.awayScore || 0;
    gameInfo.current = true;

    await this.dbManager.insert(gameInfo);

    this.server.broadcast({ currentGame: gameInfo });
  }

  getCurrentGame() {
    return this.dbManager.findOne({ current: true });
  }

  async announceGame() {
    const currentGame = await this.getCurrentGame();
    this.server.broadcast({ currentGame });
  }

  async pauseGame() {
    const now = new Date().getTime();
    const currentGame = await this.getCurrentGame();

    currentGame.timeLeft = currentGame.end - now;
    currentGame.paused = true;

    this.dbManager.update({ created: currentGame.created }, currentGame);

    this.server.broadcast({ currentGame });
  }

  async unpauseGame() {
    const now = new Date().getTime();
    const currentGame = await this.getCurrentGame();

    currentGame.start = now + this.pause;
    currentGame.end = currentGame.start + currentGame.timeLeft;
    currentGame.paused = false;

    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.server.broadcast({ currentGame });
  }

  async homeScore() {
    const currentGame = await this.getCurrentGame();
    currentGame.homeScore++;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.server.broadcast({ currentGame });
  }

  async awayScore() {
    const currentGame = await this.getCurrentGame();
    currentGame.awayScore++;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.server.broadcast({ currentGame });
  }

  async currentGame() {
    const currentGame = await this.getCurrentGame();

    this.server.broadcast({ currentGame });
  }

  handleMessage(message) {
    switch (message.action) {
      case "pause":
        return this.pauseGame();
      case "unpause":
        return this.unpauseGame();
      case "newGame":
        return this.newGame(message.gameInfo);
      case "homeScore":
        return this.homeScore();
      case "awayScore":
        return this.awayScore();
      case "currentGame":
        return this.currentGame();
    }
  }
}

const gameStructure = {
  home: "home team name",
  away: "away team name",
  duration: 20,
  homeScore: 0,
  awayScore: 0,
  created: 123456789,
  start: 123456789,
  end: 123456789,
  timeLeft: 123,
  paused: true,
  current: true
};

module.exports = GameManager;
