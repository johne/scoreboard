import React from "react";
import { Container, Row, Col } from "react-grid-system";

import Timer from "../scoreboard/timer";
import ScoreBlock from "../scoreboard/score";

import { setConfiguration } from "react-grid-system";

setConfiguration({
  gutterWidth: 1,
  gridColumns: 20,
  breakpoints: [576, 720, 992, 1200],
  containerWidths: [540, 710, 1210, 1210]
});

class Controller extends React.Component {
  onTimerClick = () => {
    const { currentGame, sendMessage } = this.props;

    const now = new Date().getTime();
    const paused = currentGame && currentGame.paused;
    const finished = true;
    // !paused && currentGame && currentGame.end && now > currentGame.end;

    if (finished) {
      sendMessage({
        action: "newGame",
        gameInfo: {
          home: "Dad",
          away: "Reef",
          duration: 1
        }
      });
    } else {
      sendMessage({
        action: paused ? "unpause" : "pause"
      });
    }
  };

  addScoreHome = () => {
    const { sendMessage } = this.props;
    sendMessage({
      action: "homeScore"
    });
  };

  addScoreAway = () => {
    const { sendMessage } = this.props;
    sendMessage({
      action: "awayScore"
    });
  };

  render = () => {
    const { currentGame, onComplete } = this.props;

    const { home, homeScore, away, awayScore } = currentGame;

    return (
      <Container
        style={{
          padding: 0,
          paddingTop: 5,
          marginLeft: 5,
          maxHeight: 1280,
          overflow: "hidden"
        }}
      >
        <Row style={{ backgroundColor: "#1f567c" }} onClick={this.onTimerClick}>
          <Col style={{ border: "white solid 5px" }}>
            <Timer {...currentGame} onComplete={onComplete} />
          </Col>
        </Row>
        <Row style={{ backgroundColor: "#1f567c" }}>
          <Col
            style={{ border: "white solid 5px" }}
            onClick={this.addScoreAway}
          >
            <ScoreBlock name={away} score={awayScore} />
          </Col>
          <Col
            style={{ border: "white solid 5px" }}
            onClick={this.addScoreHome}
          >
            <ScoreBlock name={home} score={homeScore} />
          </Col>
        </Row>
      </Container>
    );
  };
}

export default Controller;
