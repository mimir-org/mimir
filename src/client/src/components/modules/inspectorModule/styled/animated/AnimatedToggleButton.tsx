import styled, { keyframes } from "styled-components";
import ToggleButton from "../../../../../assets/icons/ToggleButton";

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

const AnimatedToggleButton = styled(ToggleButton)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedToggleButton;
