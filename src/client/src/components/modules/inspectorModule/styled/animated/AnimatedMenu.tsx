import styled, { keyframes } from "styled-components";
import { StyledInspectorComponent } from "..";

const animation = (props: { start: string; stop: string }) => keyframes`
  from {
    height: ${props.start}px;
  },
  to {
    height: ${props.stop}px;
  }
`;

const AnimatedMenu = styled(StyledInspectorComponent)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedMenu;
