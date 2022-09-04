import styled, { keyframes } from "styled-components";
import { Color } from "../../../../assets/color/Color";

export const LockSpinner = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  margin: 18px -12px 0px 7px;
  transform: translate(-50%, -50%);
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 4px solid ${Color.GHOST_WHITE};
  border-top: 4px solid ${Color.BASTILLE};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 2s linear infinite;
`;
