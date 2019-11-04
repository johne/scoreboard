import React from "react";
import Timer from "./timer";
import ScoreBlock from "./score";
import Weather from "./weather";
import Clock from "./clock";
import Feed from "./feed";

const Scoreboard = ({ currentGame, onComplete }) => {
  const { home, homeScore, away, awayScore } = currentGame;
  return (
    <div>
      <Timer {...currentGame} onComplete={onComplete} />
      <ScoreBlock name={home} score={homeScore} />
      <ScoreBlock name={away} score={awayScore} />
      <Weather />
      <Clock />
      <Feed />
    </div>
  );
};

export default Scoreboard;
