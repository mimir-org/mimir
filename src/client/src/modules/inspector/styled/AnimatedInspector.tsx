import styled, { keyframes } from "styled-components";
import { InspectorBox } from "./";

interface Props {
  start: number;
  stop: number;
  run: boolean;
  library: boolean;
  explorer: boolean;
  height: number;
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

const AnimatedInspector = styled((props) => <InspectorBox {...props} />)`
  animation: ${Animation} 0.3s ease-in-out;
`;

export default AnimatedInspector;
