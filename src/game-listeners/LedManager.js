const solidTemplate = require("./leds/solid-template");
const scoreTemplate = require("./leds/score-template");
const fetch = require("node-fetch");

const ledAddress = "http://home-main-lights.local/json/si";

const runningColor = [255, 255, 255];
const pausedColor = [128, 128, 128];
const endColor = [255, 0, 0];

class LedManager {
  constructor() {
    this.gameOverFlag = false;
    this.paused = false;
  }

  _sendState(newState) {
    fetch(ledAddress, { method: "POST", body: JSON.stringify(newState) }).catch(
      err => console.log("some led fetch error", err)
    );
  }

  _solidState() {
    const solid = this.gameOverFlag
      ? endColor
      : this.paused
      ? pausedColor
      : runningColor;
    this._sendState(solidTemplate(solid));
  }

  _score(team) {
    if (team && team.scoreColors) {
      const { fgColor, bgColor } = team.scoreColors;
      if (this.scoreTimeout) {
        clearTimeout(this.scoreTimeout);
      } else {
        this._sendState(scoreTemplate(fgColor, bgColor));
      }

      this.scoreTimeout = setTimeout(() => {
        this.scoreTimeout = undefined;
        this._solidState();
      }, 1000 * 2);
    }
  }

  _pauseGame() {
    this.paused = true;
    this._solidState();
  }

  _unpauseGame() {
    this.gameOverFlag = false;
    this.paused = false;
    this._solidState();
  }

  _homeScore(currentGame) {
    currentGame.teamInfo && this._score(currentGame.teamInfo.home);
  }

  _awayScore(currentGame) {
    currentGame.teamInfo && this._score(currentGame.teamInfo.away);
  }

  _playPause(currentGame) {
    if (currentGame.paused) {
      return this._unpauseGame();
    } else {
      return this._pauseGame();
    }
  }

  handleMessage(message, currentGame) {
    if (currentGame) {
      switch (message.action) {
        case "playPause":
          return this._playPause(currentGame);
        case "pause":
          return this._pauseGame(currentGame);
        case "unpause":
          return this._unpauseGame(currentGame);
        case "homeScore":
          return this._homeScore(currentGame);
        case "awayScore":
          return this._awayScore(currentGame);
      }
    }
  }

  gameOver(currentGame) {
    const { homeScore, awayScore, teamInfo } = currentGame;

    let newState = solidTemplate(endColor);

    if (homeScore > awayScore && teamInfo && teamInfo.away) {
      newState = scoreTemplate(teamInfo.away.fgColor, teamInfo.away.bgColor);
    }

    if (awayScore > homeScore && teamInfo && teamInfo.home) {
      newState = scoreTemplate(teamInfo.home.fgColor, teamInfo.home.bgColor);
    }

    console.log("led game over!!!");
    this.gameOverFlag = true;
    this._sendState(newState);
  }
}

module.exports = LedManager;
