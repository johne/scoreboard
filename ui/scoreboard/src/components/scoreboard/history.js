import React from "react";
import {
  HistoryTitle,
  HistoryContainer,
  HistoryData,
  HistoryGame,
  HistoryScoreRow,
  HistoryScoreTeam
} from "./styled";

const formatDate = ({ created }) => {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  return new Date(created).toLocaleString("en-US", options);
};

const History = ({ savedGames }) => {
  return (
    <HistoryContainer>
      <HistoryTitle>Game History</HistoryTitle>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "5px",
          marginBottom: "5px",
          height: "15px"
        }}
      >
        &nbsp;
      </div>
      <HistoryData>
        {savedGames.map(game => (
          <HistoryGame key={game.created}>
            <div>{formatDate(game)}</div>
            <HistoryScoreRow>
              <HistoryScoreTeam>
                {game.away}: {game.awayScore}
              </HistoryScoreTeam>
              <HistoryScoreTeam>
                {game.home}: {game.homeScore}
              </HistoryScoreTeam>
            </HistoryScoreRow>
          </HistoryGame>
        ))}
      </HistoryData>
    </HistoryContainer>
  );
};

export default History;
