const DbManager = require("./DbManager");
const RemoteManager = require("./RemoteManager");

class GameManager {
  constructor(server) {
    this.server = server;
    this.dbManager = new DbManager();
    this.pause = 0;
    this.remoteManager = new RemoteManager(this);
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
    gameInfo.shotClock = gameInfo.shotClock || 24;
    gameInfo.shotClockEnd = gameInfo.start + gameInfo.shotClock * 1000;
    gameInfo.shotClockLeft = gameInfo.shotClock * 1000;

    console.log("controllers", gameInfo.controllers);

    gameInfo.controllers = gameInfo.controllers || {
      teal: "home",
      yellow: "away"
    };

    await this.dbManager.insert(gameInfo);

    this.announceGame();
  }

  getCurrentGame() {
    return this.dbManager.findOne({ current: true });
  }

  async announceGame() {
    const currentGame = await this.getCurrentGame();

    const connectedControllers = this.remoteManager.getConnected();

    this.server.broadcast({
      currentGame: { ...currentGame, connectedControllers }
    });
  }

  async pauseGame() {
    const now = new Date().getTime();
    const currentGame = await this.getCurrentGame();

    currentGame.timeLeft = currentGame.end - now;
    currentGame.shotClockLeft = currentGame.shotClockEnd - now;
    currentGame.paused = true;

    this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async unpauseGame() {
    const now = new Date().getTime();
    const currentGame = await this.getCurrentGame();

    currentGame.start = now + this.pause;
    currentGame.end = currentGame.start + currentGame.timeLeft;
    currentGame.shotClockEnd = currentGame.start + currentGame.shotClockLeft;
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

  async shotClockReset() {
    const now = Math.floor(new Date().getTime() / 1000) * 1000;
    const currentGame = await this.getCurrentGame();

    const mils = currentGame.end % 1000;

    currentGame.shotClockLeft = currentGame.shotClock * 1000 + mils;
    currentGame.shotClockEnd = now + currentGame.shotClockLeft;

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

  async addSecs(secs) {
    const currentGame = await this.getCurrentGame();
    currentGame.end += secs * 1000;
    currentGame.timeLeft += secs * 1000;
    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
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
      case "shotClock":
        return this.shotClockReset();
      case "add5Seconds":
        return this.addSecs(5);
      case "add10Seconds":
        return this.addSecs(10);
      case "remove5Seconds":
        return this.addSecs(-5);
      case "remove10Seconds":
        return this.addSecs(-10);
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
