import React from "react";
import styled from "styled-components";

const ScoreContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: "center";
  padding-top: 10px;
  padding-bottom: 15px;
  display: flex;
  flex-flow: column;
  ${props => props.img && `background-image: url("${props.img}");`}
  background-position: ${props => props.side} bottom; /*Positioning*/
  background-repeat: no-repeat; /*Prevent showing multiple background images*/
`;

const Team = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-size: 100px;
  font-family: "Tahoma";
  flex: 1 1 auto;
  padding-top: 10px;
`;
const Score = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 150px;
  font-family: "Tahoma";
  flex: 0 1 5px;
  padding-bottom: 25px;
`;

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
