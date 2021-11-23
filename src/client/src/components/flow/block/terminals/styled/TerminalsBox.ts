import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  parent: boolean;
  input: boolean;
  xPos: number;
  color: string;
}

const TerminalsBox = styled.div<Props>`
  border: 1px solid;
  border-color: ${(props) => props.color};
  background-color: ${Color.White};
  border-radius: 5px;
  min-width: 150px;
  width: max-content;
  position: absolute;
  top: ${(props) => (props.parent ? 3 : 5)}px;
  left: ${(props) => (!props.input ? props.xPos + "px" : "unset")};
  right: ${(props) => (props.input ? props.xPos + "px" : "unset")};
  transition: right 250ms ease-in-out, left 250ms ease-in-out, top 250ms ease-in-out;
  pointer-events: all;
  z-index: 7;
`;

export default TerminalsBox;
