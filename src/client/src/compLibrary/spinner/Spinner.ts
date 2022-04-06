import styled, { keyframes } from "styled-components";
import { Color } from "../colors/Color";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 16px solid ${Color.GHOST_WHITE};
  border-top: 16px solid ${Color.BASTILLE};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 2s linear infinite;
`;

interface Props {
  fetching: boolean;
}

export const SpinnerWrapper = styled.div<Props>`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => !props.fetching && "none"};
  z-index: 100;
`;
