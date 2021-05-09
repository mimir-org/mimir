import styled, { keyframes } from "styled-components";
import { ModuleBox } from "../box";
import { MODULE_TYPE } from "../../models/project";

interface Props {
  start: string;
  stop: string;
  run: boolean;
  type: string;
}

const Animation = ({ start, stop, run, type }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {
    ${type === MODULE_TYPE.INSPECTOR ? "height" : "width"}: ${start};
  },
  to {
    ${type === MODULE_TYPE.INSPECTOR ? "height" : "width"}: ${stop};
  }  
`;

const AnimatedModule = styled(ModuleBox)`
  animation: ${Animation} 0.3s ease-in-out;
`;

export default AnimatedModule;
