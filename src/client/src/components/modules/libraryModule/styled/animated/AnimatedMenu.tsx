import { FC } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  start: string;
  stop: string;
}

const StyledWrapper = styled.div`
  border-left: 2px solid black;
  background: #f2f2f2;
  width: ${(props: { stop: string }) => props.stop}px;
  overflow: hidden;
`;

const animation: FC<Props> = ({ start, stop }) => keyframes`
  from {
    width: ${start}px;
  },
  to {
    width: ${stop}px;
  }
`;

const AnimatedMenu = styled(StyledWrapper)`
  animation: ${animation} 0.4s ease-in-out;
`;

export default AnimatedMenu;
