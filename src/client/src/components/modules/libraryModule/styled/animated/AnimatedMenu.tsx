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
    width: ${start};
  },
  to {
    width: ${stop};
  }  
`;

const AnimatedMenu = styled(LibraryContainer)`
  animation: ${animation} 0.3s ease-in-out;
`;

export default AnimatedMenu;
