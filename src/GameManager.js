const DbManager = require("./DbManager");

class GameManager {
  constructor(server) {
    this.server = server;
    this.dbManager = new DbManager();
    this.pause = 5 * 1000;
  }

  async closeAllGames() {
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
    gameInfo.start = new Date().getTime() + this.pause;
    gameInfo.timeLeft = gameInfo.duration * 60 * 1000;
    gameInfo.end = gameInfo.start + gameInfo.timeLeft;
    gameInfo.paused = true;
    gameInfo.homeScore = gameInfo.homeScore || 0;
    gameInfo.awayScore = gameInfo.awayScore || 0;
    gameInfo.current = true;

    await this.dbManager.insert(gameInfo);

    this.announceGame();
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

    this.announceGame();
  }

  async unpauseGame() {
    const now = new Date().getTime();
    const currentGame = await this.getCurrentGame();

    currentGame.start = now + this.pause;
    currentGame.end = currentGame.start + currentGame.timeLeft;
    currentGame.paused = false;

    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async homeScore() {
    const currentGame = await this.getCurrentGame();
    currentGame.homeScore++;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async awayScore() {
    const currentGame = await this.getCurrentGame();
    currentGame.awayScore++;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async awayMinusScore() {
    const currentGame = await this.getCurrentGame();
    currentGame.awayScore--;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async homeMinusScore() {
    const currentGame = await this.getCurrentGame();
    currentGame.homeScore--;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async overtime() {
    const overtimeMins = 5;
    const currentGame = await this.getCurrentGame();
    currentGame.overtime = currentGame.overtime && 0;
    currentGame.overtime += overtimeMins;
    currentGame.timeLeft = overtimeMins * 60 * 1000;
    currentGame.paused = true;

    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async currentGame() {
    this.announceGame();
  }

  async playPause() {
    const currentGame = await this.getCurrentGame();

    if (currentGame.paused) {
      return this.unpauseGame();
    } else {
      return this.pauseGame();
    }
  }

  handleMessage(message) {
    switch (message.action) {
      case "playPause":
        return this.playPause();
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
      case "homeMinusScore":
        return this.homeMinusScore();
      case "awayMinusScore":
        return this.awayMinusScore();
      case "currentGame":
        return this.currentGame();
      case "overtime":
        return this.overtime();
    }
  }

  history() {
    return this.dbManager.find();
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
  current: true,
  overtime: 5
};

module.exports = GameManager;
