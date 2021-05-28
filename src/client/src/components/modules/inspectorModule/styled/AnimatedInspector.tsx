import styled, { keyframes } from "styled-components";
import { InspectorBox } from "./";

interface Props {
  start: string;
  stop: string;
  run: boolean;
  library: boolean;
  explorer: boolean;
}

const Animation = ({ start, stop, run }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {
    height: ${start}px;
  }
  to {
    height: ${stop}px;
  }  
`;

const AnimatedInspector = styled(InspectorBox)`
  animation: ${Animation} 0.3s ease-in-out;
`;

export default AnimatedInspector;
