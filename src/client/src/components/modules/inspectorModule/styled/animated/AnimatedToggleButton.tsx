import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { ToggleButton } from "../../../../../assets/buttons/ToggleButton";

interface Props {
  start: string;
  stop: string;
}

const animation: FC<Props> = ({ start, stop }) => keyframes`
  from {
    bottom: ${start}px;
  },
  to {
    bottom: ${stop}px;
  }
`;

const AnimatedToggleButton = styled(ToggleButton)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedToggleButton;
