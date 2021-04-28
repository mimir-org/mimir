import styled, { keyframes } from "styled-components";
import { InspectorWrapper } from "..";

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

const AnimatedInspectorMenu = styled(InspectorWrapper)`
  animation: ${animation} 0.3s ease-in-out;
`;

export default AnimatedInspectorMenu;
