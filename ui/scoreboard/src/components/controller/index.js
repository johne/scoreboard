import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div``;

const Controller = ({ currentGame, sendMessage }) => {
  const now = new Date().getTime();
  const paused = currentGame && currentGame.paused;
  const finished =
    !paused && currentGame && currentGame.end && now > currentGame.end;

  return (
    <StyledDiv>
      <button
        onClick={() =>
          sendMessage({
            action: "newGame",
            gameInfo: {
              home: "lazy llamas",
              away: "polar puppy pops",
              duration: 20
            }
          })
        }
      >
        New Game
      </button>
      {currentGame && (
        <React.Fragment>
          <button
            onClick={() =>
              sendMessage({
                action: "awayScore"
              })
            }
          >
            away score
          </button>
          <button
            onClick={() =>
              sendMessage({
                action: "homeScore"
              })
            }
          >
            homeScore
          </button>
        </React.Fragment>
      )}
      {currentGame && !finished && (
        <button
          onClick={() =>
            sendMessage({
              action: paused ? "unpause" : "pause"
            })
          }
        >
          {paused ? "unpause" : "pause"}
        </button>
      )}
    </StyledDiv>
  );
};

export default Controller;
