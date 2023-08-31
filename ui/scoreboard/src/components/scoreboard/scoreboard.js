import React from "react";

import { Container, Row, Col } from "react-grid-system";

import Timer from "./timer";
import ScoreBlock from "./score";
import Weather from "./weather";
import Clock from "./clock";
import Feed from "./feed";
import {
  TopLeft,
  TopMiddle,
  TopRight,
  BottomLeft,
  BottomMiddle,
  BottomRight,
  MiddleBar,
  Bar,
  BlackBox
} from "./styled";
import ShotClock from "./shotClock";

const Scoreboard = ({ currentGame, onComplete }) => {
  const { home, homeScore, away, awayScore } = currentGame;
  return (
    <table
      cellspacing="0"
      cellpadding="0"
      style={{
        padding: "0px",
        border: "none",
        overflow: "hidden",
        width: "1919px",
        height: "1079px"
      }}
    >
      <tr>
        <TopLeft></TopLeft>
        <Bar />
        <TopMiddle>
          <ScoreBlock name={away} score={awayScore} />
        </TopMiddle>
        <MiddleBar />
        <TopMiddle>
          <ScoreBlock name={home} score={homeScore} />
        </TopMiddle>
        <Bar />
        <TopRight></TopRight>
      </tr>
      <tr>
        <Bar />
      </tr>
      <tr>
        <BottomLeft></BottomLeft>
        <Bar />
        <BottomMiddle>
          <Container
            style={{
              padding: 0,
              marginLeft: 0,
              maxHeight: "555px",
              overflow: "hidden"
            }}
          >
            <Row style={{ height: "48%" }}>
              <Col>
                <Timer {...currentGame} onComplete={onComplete} />
              </Col>
            </Row>
            <Row style={{ height: "4%" }}>
              <Col>
                <div style={{ backgroundColor: "white" }}>&nbsp;</div>
              </Col>
            </Row>
            <Row style={{ height: "48%" }}>
              <Col>
                <ShotClock {...currentGame} />
              </Col>
            </Row>
          </Container>
        </BottomMiddle>
        <MiddleBar />
        <BottomMiddle>
          <Feed />
        </BottomMiddle>
        <Bar />
        <BottomRight>
          <BlackBox />
        </BottomRight>
      </tr>
    </table>
  );
};

export default Scoreboard;
