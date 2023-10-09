import styled, { keyframes } from "styled-components";
import {HorizontalModuleBox, VerticalModuleBox} from "./AnimatedModule.styled";
import { IsInspector } from "../../helpers/Modules";

interface Props {
  start: number;
  stop: number;
  run?: boolean;
  type: string;
  libOpen?: boolean;
  explorerOpen?: boolean;
  isHorizontal?: false | boolean;
}

const Animation = ({ start, stop, run, type }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {${IsInspector(type) ? "height" : "width"}: ${start}px;}
  to {${IsInspector(type) ? "height" : "width"}: ${stop}px;}
`;
export const AnimatedModule = styled((props) => props.isHorizontal ? <HorizontalModuleBox {...props} /> : <VerticalModuleBox {...props} />)`
  animation: ${Animation} 0.2s ease-in-out;
`;
