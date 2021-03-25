import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { StyledInspectorComponent } from "..";

interface Props {
  start: string;
  stop: string;
}

const animation: FC<Props> = ({ start, stop }) => keyframes`
  from {
    height: ${start}px;
  },
  to {
    height: ${stop}px;
  }
`;

const AnimatedMenu = styled(StyledInspectorComponent)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedMenu;
