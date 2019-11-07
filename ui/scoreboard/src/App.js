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
      currentGame: {}
    };
  }

  handleData = data => {
    const { currentGame } = data;

    this.setState({ currentGame });
  };

  sendMessage = msg => {
    this.refWebSocket.request({
      method: "POST",
      path: "update",
      payload: JSON.stringify(msg)
    });
  };

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
