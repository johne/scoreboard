import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Scoreboard from "./components/scoreboard/";
import Controller from "./components/controller/";
const Nes = require("@hapi/nes/lib/client");

const StyledDiv = styled.div``;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentGame: {},
      historyTeams: [
        "dad@reef",
        "reef@dad",
        "penguin polar pops@lazy llamas",
        "lazy llamas@penguin polar pops",
        "something else"
      ]
    };
  }

  handleData = data => {
    console.log(data);

    const { currentGame } = data;

    if (currentGame) {
      this.setState(prev => {
        return { currentGame };
      });
    }
  };

  sendMessage = msg => {
    this.refWebSocket.request({
      method: "POST",
      path: "update",
      payload: JSON.stringify(msg)
    });
  };

  getHistory() {
    fetch("http://ellis-scoreboard.local:3000/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => {
        console.log("here");
        return res.json();
      })
      .then(res => {
        const historyTeams = Array.from(
          res.reduce((list, game) => {
            return list
              .add(`${game.home}@${game.away}`)
              .add(`${game.away}@${game.home}`);
          }, new Set())
        );
        console.log(historyTeams);
        this.setState(prev => {
          return { historyTeams };
        });
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
  }

  componentDidMount() {
    console.log("here again");
    this.refWebSocket = new Nes.Client("ws://ellis-scoreboard.local:3000");
    this.refWebSocket.connect().then(() => {
      this.refWebSocket.onUpdate = this.handleData;
      this.sendMessage({ action: "currentGame" });
      this.getHistory();
    });
  }

  onComplete = () => {
    //this.sendMessage({ action: "currentGame" });
  };

  render() {
    const { currentGame, historyTeams } = this.state;

    return (
      <Router className="App">
        <StyledDiv>
          {currentGame && (
            <React.Fragment>
              <Route
                exact
                path="/scoreboard"
                render={props => (
                  <Scoreboard
                    {...props}
                    currentGame={currentGame}
                    onComplete={this.onComplete}
                  />
                )}
              />
              <Route
                exact
                path="/controller"
                render={props => (
                  <Controller
                    {...props}
                    currentGame={currentGame}
                    sendMessage={this.sendMessage}
                    onComplete={this.onComplete}
                    historyTeams={historyTeams}
                  />
                )}
              />
            </React.Fragment>
          )}
        </StyledDiv>
      </Router>
    );
  }
}

export default App;
