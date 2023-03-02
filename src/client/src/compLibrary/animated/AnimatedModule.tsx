import styled, { keyframes } from "styled-components";
import { ModuleBox } from "./AnimatedModule.styled";

interface Props {
  start: number;
  stop: number;
  run?: boolean;
  inspector: boolean;
}

const Animation = ({ start, stop, run, inspector }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {${inspector ? "height" : "width"}: ${start}px;}
  to {${inspector ? "height" : "width"}: ${stop}px;}  
`;

export const AnimatedModule = styled((props) => <ModuleBox {...props} />)`
  animation: ${Animation} 0.2s ease-in-out;
`;
