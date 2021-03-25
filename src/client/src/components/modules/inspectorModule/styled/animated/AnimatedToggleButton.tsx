import styled, { keyframes } from "styled-components";
import { ToggleInspectorIcon } from "../../fragments/styled";

const animation = (props: {
  start: string;
  stop: string;
  visible;
}) => keyframes`
  from {
    bottom: ${props.start}px;
  },
  to {
    bottom: ${props.stop}px;
  }
`;

const AnimatedToggleButton = styled(ToggleInspectorIcon)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedToggleButton;
