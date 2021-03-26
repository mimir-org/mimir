import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { LibraryContainer } from "../";

interface Props {
  start: string;
  stop: string;
}

const animation: FC<Props> = ({ start, stop }) => keyframes`
  from {
    width: ${start}px;
  },
  to {
    width: ${stop}px;
  }
`;

const AnimatedMenu = styled(LibraryContainer)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedMenu;
