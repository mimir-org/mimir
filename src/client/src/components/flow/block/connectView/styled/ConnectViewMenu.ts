import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

interface Props {
  color: string;
  bottom: number;
}

/** Styled component that displays the drop-down menu for the ConnectViewMenu. */
const ConnectViewMenu = styled.div<Props>`
  border: 2px solid;
  border-color: ${(props) => props.color};
  background-color: ${Color.White};
  border-radius: 5px;
  width: max-content;
  position: absolute;
  bottom: ${(props) => props.bottom}px;
  z-index: 1;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default ConnectViewMenu;