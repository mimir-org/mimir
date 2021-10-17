import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

interface Props {
  color: string;
  parent: boolean;
  input: boolean;
  connectView: boolean;
  splitView: boolean;
  width: number;
}

/** Styled component that displays the drop-down menu for a nodes' terminals. */
const TerminalsMenu = styled.div<Props>`
  border: 1px solid;
  border-color: ${(props) => props.color};
  background-color: ${Color.White};
  border-radius: 5px;
  z-index: 4;
  min-width: 150px;
  width: max-content;
  position: absolute;
  top: ${(props) => (props.parent ? 0 : 5)}px;
  left: ${(props) => !props.input && props.width + 22}px;
  right: ${(props) => props.input && props.width + 22}px;
`;

export default TerminalsMenu;
