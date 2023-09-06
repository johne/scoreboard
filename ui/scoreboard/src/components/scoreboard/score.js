import React from "react";

import { ScoreContainer, Team, Score } from "./styled";

const ScoreBlock = ({ name, score, teamInfo, side }) => {
  const img = teamInfo?.connected
    ? `${teamInfo.controller}-controller.png`
    : undefined;

  return (
    <ScoreContainer side={side} img={img}>
      <Team>{name}</Team>
      <Score>{score}</Score>
    </ScoreContainer>
  );
};

export default ScoreBlock;
