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
  breakpoints: [576, 768, 992, 1200],
  containerWidths: [540, 750, 1280, 1280]
});

const Scoreboard = ({ currentGame, onComplete }) => {
  const { home, homeScore, away, awayScore } = currentGame;
  return (
    <Container>
      <Row>
        <Col md={11} style={{ backgroundColor: "white" }}>
          <Row style={{ height: 470 }}>
            <Col
              style={{ backgroundColor: "#1f567c", border: "white solid 10px" }}
            >
              <Timer {...currentGame} onComplete={onComplete} />
            </Col>
            <Col
              md={5}
              style={{
                border: "white solid 10px",
                padding: 5,
                backgroundColor: "#1f567c",
                alignContent: "center"
              }}
            >
              <Row>
                <Clock />
              </Row>
              <Row>
                <Weather />
              </Row>
            </Col>
          </Row>
          <Row style={{ height: 250, backgroundColor: "#1f567c" }}>
            <Col style={{ border: "white solid 10px" }}>
              <ScoreBlock name={home} score={homeScore} />
            </Col>
            <Col style={{ border: "white solid 10px" }}>
              <ScoreBlock name={away} score={awayScore} />
            </Col>
          </Row>
        </Col>
        <Col
          md={9}
          style={{ backgroundColor: "#1f567c", border: "white solid 10px" }}
        >
          <Row>
            <Feed />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Scoreboard;
