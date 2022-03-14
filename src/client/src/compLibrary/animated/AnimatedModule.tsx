import styled, { keyframes } from "styled-components";
import { ModuleBox } from "./AnimatedModule.styled";
import { MODULE_TYPE } from "../../models/project";

interface Props {
  start: number;
  stop: number;
  run?: boolean;
  type: string;
}

const Animation = ({ start, stop, run, type }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {
    ${type === MODULE_TYPE.INSPECTOR || type === MODULE_TYPE.LEGEND ? "height" : "width"}: ${start}px;
  }
  to {
    ${type === MODULE_TYPE.INSPECTOR || type === MODULE_TYPE.LEGEND ? "height" : "width"}: ${stop}px;
  }  
`;

const AnimatedModule = styled((props) => <ModuleBox {...props} />)`
  animation: ${Animation} 0.2s ease-in-out;
`;

export default AnimatedModule;
