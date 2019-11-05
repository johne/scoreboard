import React from "react";
import styled from "styled-components";

const ScoreConatiner = styled.div`
  width: 100%;
  height: 100%;
  text-align: "center";
  padding-top: 10px;
  display: flex;
  flex-flow: column;
`;

const Team = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-size: 50px;
  font-family: "Tahoma";
  flex: 1 1 auto;
`;
const Score = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 100px;
  font-family: "Tahoma";
  flex: 0 1 130px;
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
