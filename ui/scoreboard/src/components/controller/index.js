import * as React from "react";
import { Container, Row, Col } from "react-grid-system";

import Timer from "../scoreboard/timer";
import ScoreBlock from "../scoreboard/score";

import { setConfiguration } from "react-grid-system";
import {
  GameLength,
  TeamQuickSelect,
  SelectedTeam,
  SubmitButton
} from "./controller.styled";

setConfiguration({
  gutterWidth: 1,
  gridColumns: 20,
  breakpoints: [576, 720, 992, 1200],
  containerWidths: [540, 710, 1210, 1210]
});

const Controller = ({ currentGame, sendMessage, onComplete, historyTeams }) => {
  const { home, homeScore, away, awayScore } = currentGame;

  const [duration, setDuration] = React.useState(20);
  const [teamNames, setTeamNames] = React.useState(historyTeams[0]);

  const newGameClick = () => {
    console.log("new game");
    const [away, home] = teamNames.split("@");

    sendMessage({ action: "newGame", gameInfo: { home, away, duration } });
  };

  const onTimerClick = () => {
    // const paused = currentGame && currentGame.paused;
    // const finished = true;
    // // !paused && currentGame && currentGame.end && now > currentGame.end;
    // if (finished) {
    //   sendMessage({
    //     action: "newGame",
    //     gameInfo: {
    //       home: "lazy llamas",
    //       away: "penguin polar pops",
    //       duration: 15
    //     }
    //   });
    // } else {
    //   sendMessage({
    //     action: paused ? "unpause" : "pause"
    //   });
    // }
  };

  const addScore = team => {
    sendMessage({
      action: `${team}Score`
    });
  };

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
      <Row>
        <Col>
          <SelectedTeam
            placeholder="Team Names (with @)"
            value={teamNames}
            onChange={e => setTeamNames(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <GameLength
            type="number"
            placeholder="Game Length"
            value={duration}
            onChange={e => setDuration(parseInt(e.target.value))}
          />
        </Col>
        <Col>
          <TeamQuickSelect onChange={e => setTeamNames(e.target.value)}>
            {historyTeams.map(teams => (
              <option key={teams} value={teams}>
                {teams}
              </option>
            ))}
          </TeamQuickSelect>
        </Col>
      </Row>
      <Row>
        <SubmitButton onClick={newGameClick}>New Game</SubmitButton>
      </Row>
      <Row style={{ backgroundColor: "#1f567c" }} onClick={onTimerClick}>
        <Col style={{ border: "white solid 5px" }}>
          <Timer {...currentGame} onComplete={onComplete} />
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#1f567c" }}>
        <Col
          style={{ border: "white solid 5px" }}
          onClick={() => addScore("away")}
        >
          <ScoreBlock name={away} score={awayScore} />
        </Col>
        <Col
          style={{ border: "white solid 5px" }}
          onClick={() => addScore("home")}
        >
          <ScoreBlock name={home} score={homeScore} />
        </Col>
      </Row>
    </Container>
  );
};

export default Controller;
