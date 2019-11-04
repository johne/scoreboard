import React from "react";
import styled from "styled-components";

const ScoreConatiner = styled.div`
  margin: 10px;
`;

const Team = styled.div``;
const Score = styled.div``;

const ScoreBlock = ({ name, score }) => {
  return (
    <ScoreConatiner>
      <Team>{name}</Team>
      <Score>{score}</Score>
    </ScoreConatiner>
  );
};

export default ScoreBlock;
