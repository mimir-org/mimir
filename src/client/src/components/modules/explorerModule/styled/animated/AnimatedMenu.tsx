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
    width: ${start}px;
  },
  to {
    width: ${stop}px;
  }  
`;

const AnimatedMenu = styled(ExplorerContainer)`
  animation: ${animation} 0.3s ease-in-out;
`;

export default AnimatedMenu;
