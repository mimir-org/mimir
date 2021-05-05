import styled, { keyframes } from "styled-components";
import ExplorerContainer from "../ExplorerContainer";

interface Props {
  start: string;
  stop: string;
  run: boolean;
}

const animation = ({ start, stop, run }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {
    width: ${start};
  },
  to {
    width: ${stop};
  }  
`;

const AnimatedMenu = styled(ExplorerContainer)`
  animation: ${animation} 0.3s ease-in-out;
`;

export default AnimatedMenu;
