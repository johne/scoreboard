import styled from "styled-components";

const smallX = "305px";
const bigX = "525px";
const middleBar = "159px";
const bar = "50px";

const smallY = "474px";
const bigY = "555px";

const bgColor = "#1f567c";

export const TopLeft = styled.td`
  background-color: ${bgColor};
  height: ${smallY};
  width: ${smallX};
`;

export const TopRight = styled.td`
  background-color: ${bgColor};
  height: ${smallY};
  width: ${smallX};
`;

export const TopMiddle = styled.td`
  background-color: ${bgColor};
  height: ${smallY};
  width: ${bigX};
`;

export const BottomLeft = styled.td`
  background-color: ${bgColor};
  height: ${bigY};
  width: ${smallX};
`;

export const BottomRight = styled.td`
  background-color: ${bgColor};
  height: ${bigY};
  width: ${smallX};
`;

export const BottomMiddle = styled.td`
  background-color: ${bgColor};
  height: ${bigY};
  width: ${bigX};
`;

export const FeedContainer = styled.div`
  background-color: white;
  height: ${bigY};
  width: ${bigX};
`;

export const MiddleBar = styled.td`
  height: 1px;
  width: ${middleBar};
  background-color: white;
`;

export const Bar = styled.td`
  height: ${bar};
  width: ${bar};
  background-color: white;
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${bigY};
  overflow: hidden;
`;

export const HistoryTitle = styled.div`
  font-size: 45px;
  color: white;
  padding: 10px;
`;

export const HistoryData = styled.div`
  font-size: 25px;
  padding: 10px;
  color: white;
  flex-grow: 1;
`;

export const HistoryGame = styled.div`
  border-bottom: solid white 4px;
  padding-bottom: 7px;
  margin-bottom: 10px;
  :last-child {
    border: none;
  }
`;

export const HistoryScoreRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
`;

export const HistoryScoreTeam = styled.div`
  flex-grow: 1;
`;

export const ScoreContainer = styled.div`
  width: 100%;
  height: ${smallY};
  text-align: "center";
  display: flex;
  flex-flow: column;
  ${props => props.img && `background-image: url("${props.img}");`}
  background-position: ${props => props.side} bottom; /*Positioning*/
  background-repeat: no-repeat; /*Prevent showing multiple background images*/
`;

export const Team = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-size: 100px;
  font-family: "Tahoma";
  flex: 1 1 auto;
`;
export const Score = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 150px;
  font-family: "Tahoma";
  flex: 0 1 5px;
`;
