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
