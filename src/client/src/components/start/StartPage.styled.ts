import styled, { keyframes } from "styled-components";
import { Color } from "../../compLibrary/colors";
import { FontSize, FontType } from "../../compLibrary/font";

export const StartPageBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${Color.BLUE_DARK};
`;

const slideUp = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-225%);
  }
`;

export const StartPageSliderContainer = styled.div`
  position: relative;
  animation: ${slideUp} 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;

export const StartPageImage = styled.img`
  width: 380px;
  height: 100px;
`;

export const StartPageVersionText = styled.p`
  color: ${Color.WHITE};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.SUBHEADER};
  text-align: right;
  padding-right: 14px;
  width: 100%;
`;
