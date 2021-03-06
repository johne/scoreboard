import React from "react";
import { Container, Row, Col } from "react-grid-system";

import Timer from "./timer";
import ScoreBlock from "./score";
import Weather from "./weather";
import Clock from "./clock";
import Feed from "./feed";

import { setConfiguration } from "react-grid-system";

setConfiguration({
  gutterWidth: 0,
  gridColumns: 20,
  breakpoints: [576, 720, 1280, 1200],
  containerWidths: [540, 710, 1280, 1280]
});

const Scoreboard = ({ currentGame, onComplete }) => {
  const { home, homeScore, away, awayScore } = currentGame;
  return (
    <Container
      style={{ padding: "5px", paddingBottom: "0px", overflow: "hidden" }}
    >
      <Row>
        <Col
          md={11}
          style={{
            display: "flex",
            flexFlow: "column",
            height: "750",
            backgroundColor: "white"
          }}
        >
          <Row style={{ flex: "1 1 auto" }}>
            <Col
              style={{ backgroundColor: "#1f567c", border: "white solid 5px" }}
            >
              <Timer {...currentGame} onComplete={onComplete} />
            </Col>
          </Row>
          <Row>
            <Col
              md={5}
              style={{
                border: "white solid 5px",
                padding: 5,
                backgroundColor: "#1f567c",
                alignContent: "center"
              }}
            >
              <Row>
                <Clock />
              </Row>
            </Col>
            <Col
              md={15}
              style={{
                border: "white solid 5px",
                padding: 5,
                backgroundColor: "#1f567c",
                alignContent: "center"
              }}
            >
              <Weather />
            </Col>
          </Row>
          <Row style={{ flex: "0 1 auto", backgroundColor: "#1f567c" }}>
            <Col style={{ border: "white solid 5px" }}>
              <ScoreBlock name={home} score={homeScore} />
            </Col>
            <Col style={{ border: "white solid 5px" }}>
              <ScoreBlock name={away} score={awayScore} />
            </Col>
          </Row>
        </Col>
        <Col
          md={9}
          style={{
            height: 710,
            maxHeight: 710,
            backgroundColor: "#1f567c",
            border: "white solid 5px"
          }}
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
