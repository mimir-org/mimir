import styled, { keyframes } from "styled-components";
import { LibraryContainer } from "../";

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

const AnimatedMenu = styled(LibraryContainer)`
  animation: ${animation} 0.3s ease-in-out;
`;

export default AnimatedMenu;
