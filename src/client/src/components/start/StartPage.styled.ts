import styled from "styled-components";
import { Color } from "../../assets/color/Color";

export const StartPageBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${Color.MIDNIGHT_EXPRESS};
`;

export const StartPageImage = styled.img`
  width: 380px;
  height: 100px;
`;

export const StartPageVersion = styled.div`
  display: flex;
  width: 380px;
  height: 100px;
  color: white;

  & > div {
    margin-top: 5px;
    margin-left: auto;
    margin-right: 12px;
  }
`;
