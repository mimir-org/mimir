import styled, { keyframes } from "styled-components";
import { StyledToggleButton } from "..";

const animation = (props: { start: string; stop: string }) => keyframes`
  from {
    bottom: ${props.start}px;
  },
  to {
    bottom: ${props.stop}px;
  }
`;

const AnimatedToggleButton = styled(StyledToggleButton)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedToggleButton;
