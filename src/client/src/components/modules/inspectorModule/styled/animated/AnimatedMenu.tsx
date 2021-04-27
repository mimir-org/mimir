import styled, { keyframes } from "styled-components";
import { StyledInspectorComponent } from "..";

interface Props {
  start: string;
  stop: string;
  run: boolean;
}

const animation = ({ start, stop, run }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {
    height: ${start}px;
  },
  to {
    height: ${stop}px;
  }  
`;

const AnimatedMenu = styled(StyledInspectorComponent)`
  animation: ${animation} 0.3s ease-in-out;
`;

export default AnimatedMenu;
