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
  Bar
} from "./styled";
import ShotClock from "./shotClock";
import TeamLogo from "./teamLogo";
import History from "./history";

const Scoreboard = ({ currentGame, onComplete, savedGames }) => {
  const { home, homeScore, away, awayScore } = currentGame;
  console.log("savedGames", savedGames);
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
        <TopLeft>
          <TeamLogo teamInfo={currentGame?.teamInfo?.away} />
        </TopLeft>
        <Bar />
        <TopMiddle>
          <ScoreBlock
            name={away}
            score={awayScore}
            teamInfo={currentGame?.teamInfo?.away}
            side="left"
          />
        </TopMiddle>
        <MiddleBar />
        <TopMiddle>
          <ScoreBlock
            name={home}
            score={homeScore}
            teamInfo={currentGame?.teamInfo?.home}
            side="right"
          />
        </TopMiddle>
        <Bar />
        <TopRight>
          <TeamLogo teamInfo={currentGame?.teamInfo?.home} />
        </TopRight>
      </tr>
      <tr>
        <Bar />
      </tr>
      <tr>
        <BottomLeft>
          <Clock />
          <div
            style={{
              backgroundColor: "white",
              marginTop: "35px",
              marginBottom: "20px"
            }}
          >
            &nbsp;
          </div>
          <Weather />
        </BottomLeft>
        <Bar />
        <BottomMiddle>
          <Container
            style={{
              padding: 0,
              marginLeft: 0,
              height: "555px",
              overflow: "hidden"
            }}
          >
            <Row style={{ height: "270px" }}>
              <Col>
                <Timer {...currentGame} onComplete={onComplete} />
              </Col>
            </Row>
            <Row style={{ height: "15px" }}>
              <Col>
                <div style={{ backgroundColor: "white" }}>&nbsp;</div>
              </Col>
            </Row>
            <Row style={{ height: "270px" }}>
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
          <History savedGames={savedGames} />
        </BottomRight>
      </tr>
    </table>
  );
};

export default Scoreboard;
