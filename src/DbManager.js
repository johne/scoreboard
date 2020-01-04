const Path = require("path");
const Db = require("tingodb")().Db;

class DbManager {
  constructor() {
    const db = new Db(Path.join(__dirname, "../data"), {});
    this.gameData = db.collection("gameData");
  }

  insert(game) {
    return new Promise((resolve, reject) => {
      this.gameData.insert(game, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  update(query, game) {
    return new Promise((resolve, reject) => {
      this.gameData.update(query, game, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  findOne(query) {
    return new Promise((resolve, reject) => {
      this.gameData.findOne(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  find(query) {
    return new Promise((resolve, reject) => {
      this.gameData
        .find(query)
        .sort({ created: -1 })
        .toArray((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }
}

module.exports = DbManager;
