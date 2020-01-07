import styled, { css } from "styled-components";

export const GameLength = styled.input`
  height: 50px;
  border-radius: 10px;
  box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  padding: 0px 15px 0px 15px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  outline: none;
  margin: 20px;

  ::placeholder {
    opacity: 0.5;

    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #4a4a4a;
  }
  ::-webkit-inner-spin-button {
    opacity: 1;
    transform: scale(2.2);
  }
`;

export const TeamQuickSelect = styled.select`
  height: 50px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 0px 15px 0px 15px;
  margin: 20px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  outline: none;
`;

export const SelectedTeam = styled.input`
  width: 90%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  padding: 0px 15px 0px 15px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  outline: none;
  margin: 20px;

  ::placeholder {
    opacity: 0.5;

    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #4a4a4a;
  }
`;

const baseButtonStyles = css`
  display: block;
  outline: none;
  padding: 14px 15%;
  width: 100%;
  max-width: 452px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: 1.25px;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  border-radius: 6px;
  background-color: #1f567c;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  ${baseButtonStyles}
`;
