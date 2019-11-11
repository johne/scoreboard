import React from "react";
import { Container, Row, Col } from "react-grid-system";

import Timer from "./timer";
import ScoreBlock from "./score";
import Weather from "./weather";
import Clock from "./clock";
import Feed from "./feed";

import { setConfiguration } from "react-grid-system";

setConfiguration({
  gutterWidth: 1,
  gridColumns: 20,
  breakpoints: [576, 720, 992, 1200],
  containerWidths: [540, 710, 1210, 1210]
});

const Scoreboard = ({ currentGame, onComplete }) => {
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
      <Row style={{ backgroundColor: "#1f567c" }}>
        <Col style={{ border: "white solid 5px" }}>
          <Timer {...currentGame} onComplete={onComplete} />
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#1f567c" }}>
        <Col style={{ border: "white solid 5px" }}>
          <ScoreBlock name={away} score={awayScore} />
        </Col>
        <Col style={{ border: "white solid 5px" }}>
          <ScoreBlock name={home} score={homeScore} />
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#1f567c" }}>
        <Col md={15} style={{ border: "white solid 5px" }}>
          <Weather />
        </Col>
        <Col md={5} style={{ border: "white solid 5px" }}>
          <Clock />
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#1f567c" }}>
        <Col md={10} style={{ border: "white solid 5px" }}>
          <Feed />
        </Col>
        <Col md={10} style={{ border: "white solid 5px" }}>
          <Feed />
        </Col>
      </Row>
    </Container>
  );
};

export default Scoreboard;
