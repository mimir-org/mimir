import styled, { keyframes } from "styled-components";
import { Color } from "..";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 16px solid ${Color.LightGrey};
  border-top: 16px solid ${Color.BlueMagenta};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 2s linear infinite;
`;

export default Spinner;
