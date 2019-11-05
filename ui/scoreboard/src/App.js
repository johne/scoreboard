import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Scoreboard from "./components/scoreboard";
const Nes = require("@hapi/nes/lib/client");

const StyledDiv = styled.div``;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentGame: {}
    };
  }

  handleData = data => {
    const { currentGame } = data;

    this.setState({ currentGame });
  };

  sendMessage(msg) {
    this.refWebSocket.request({
      method: "POST",
      path: "update",
      payload: JSON.stringify(msg)
    });
  }

  componentDidMount() {
    this.refWebSocket = new Nes.Client("ws://Johns-MacBook-Pro.local:3001");
    this.refWebSocket.connect().then(something => {
      console.log({ something });
      this.refWebSocket.onUpdate = this.handleData;
      this.sendMessage({ action: "currentGame" });
    });
  }

  onComplete = () => {
    this.sendMessage({ action: "currentGame" });
  };

  render() {
    const { currentGame } = this.state;
    const now = new Date().getTime();
    const paused = currentGame && currentGame.paused;
    const finished =
      !paused && currentGame && currentGame.end && now > currentGame.end;
    return (
      <Router className="App">
        <StyledDiv>
          {currentGame && (
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
          )}
          <StyledDiv>
            <button
              onClick={() =>
                this.sendMessage({
                  action: "newGame",
                  gameInfo: {
                    home: "lazy llamas",
                    away: "polar puppy pops",
                    duration: 20
                  }
                })
              }
            >
              New Game
            </button>
            {currentGame && (
              <React.Fragment>
                <button
                  onClick={() =>
                    this.sendMessage({
                      action: "homeScore"
                    })
                  }
                >
                  homeScore
                </button>
                <button
                  onClick={() =>
                    this.sendMessage({
                      action: "awayScore"
                    })
                  }
                >
                  away score
                </button>
              </React.Fragment>
            )}
            {currentGame && !finished && (
              <button
                onClick={() =>
                  this.sendMessage({
                    action: paused ? "unpause" : "pause"
                  })
                }
              >
                {paused ? "unpause" : "pause"}
              </button>
            )}
          </StyledDiv>
        </StyledDiv>
      </Router>
    );
  }
}

export default App;
