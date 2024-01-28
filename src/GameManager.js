const DbManager = require("./DbManager");
const RemoteManager = require("./RemoteManager");
const { triggerListeners, triggerGameOver } = require("./game-listeners");

class GameManager {
  static teams = [
    {
      altNames: ["dad", "Dad", "idk", "IDK"],
      controller: "yellow",
      logo: "",
      scoreColors: {
        fgColor: [0, 0, 255],
        bgColor: [255, 0, 0]
      }
    },
    {
      altNames: ["reef", "Reef", "lazy llamas", "Lazy Llamas"],
      controller: "teal",
      logo: "lazy-llamas.jpeg",
      scoreColors: {
        fgColor: [115, 0, 255],
        bgColor: [0, 255, 0]
      }
    }
  ];

  constructor(server) {
    this.server = server;
    this.dbManager = new DbManager();
    this.pause = 0;
    this.remoteManager = new RemoteManager(this);
  }

  async getPositionForController(controller) {
    const currentGame = await this.getCurrentGame();

    if (!currentGame.teamInfo) {
      return undefined;
    }

    const team = Object.keys(currentGame.teamInfo).find(
      key => currentGame.teamInfo[key].controller === controller
    );

    return team;
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

  figureTeams(gameInfo) {
    const { home, away } = gameInfo;

    return GameManager.teams.reduce((teams, team) => {
      if (team.altNames.includes(home)) {
        teams.home = team;
      } else if (team.altNames.includes(away)) {
        teams.away = team;
      }

      return teams;
    }, {});
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

    gameInfo.teamInfo = this.figureTeams(gameInfo);

    await this.dbManager.insert(gameInfo);

    this.announceGame();

    this.remoteManager.checkControllers();
  }

  getCurrentGame() {
    return this.dbManager.findOne({ current: true });
  }

  async announceGame() {
    const currentGame = await this.getCurrentGame();

    this.server.broadcast({
      currentGame
    });
  }

  async changeConnector(color, connected) {
    const team = await this.getPositionForController(color);

    if (!team) {
      return;
    }

    const currentGame = await this.getCurrentGame();

    currentGame.teamInfo[team].connected = connected;

    this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async pauseGame() {
    const now = new Date().getTime();
    const currentGame = await this.getCurrentGame();

    currentGame.timeLeft = currentGame.end - now;
    currentGame.shotClockLeft = currentGame.shotClockEnd - now;
    currentGame.paused = true;

    if (this.endTimer) {
      clearTimeout(this.endTimer);
      this.endTimer = undefined;
    }

    this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async unpauseGame() {
    const currentGame = await this.getCurrentGame();

    const now = new Date().getTime();

    currentGame.start = now + this.pause;
    currentGame.end = currentGame.start + currentGame.timeLeft;
    currentGame.shotClockEnd = currentGame.start + currentGame.shotClockLeft;
    currentGame.paused = false;

    this._setupGameOverTimer(currentGame);

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

  async saveGame() {
    const currentGame = await this.getCurrentGame();

    currentGame.saved = true;

    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  _setupGameOverTimer(currentGame) {
    if (this.endTimer) {
      clearTimeout(this.endTimer);
    }

    if (!currentGame.paused) {
      const now = new Date().getTime();

      console.log("starting end timer", { now, end: currentGame.end });

      this.endTimer = setTimeout(() => {
        console.log("timeout!!!");
        triggerGameOver(currentGame);
      }, currentGame.end - now);
    }
  }

  async addSecs(secs) {
    const currentGame = await this.getCurrentGame();
    currentGame.end += secs * 1000;
    currentGame.timeLeft += secs * 1000;

    this._setupGameOverTimer(currentGame);

    await this.dbManager.update({ created: currentGame.created }, currentGame);

    this.announceGame();
  }

  async handleMessage(message) {
    triggerListeners(message, await this.getCurrentGame());

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
      case "saveGame":
        return this.saveGame();
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
