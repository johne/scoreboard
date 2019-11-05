import React from "react";
import styled from "styled-components";

const ScoreConatiner = styled.div`
  width: 100%;
  text-align: "center";
  padding-top: 10px;
`;

const Team = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-size: 50px;
  font-family: "Tahoma";
`;
const Score = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-weight: bolf;
  font-size: 100px;
  font-family: "Tahoma";
`;

const ScoreBlock = ({ name, score }) => {
  return (
    <ScoreConatiner>
      <Team>{name}</Team>
      <Score>{score}</Score>
    </ScoreConatiner>
  );
};

export default ScoreBlock;
