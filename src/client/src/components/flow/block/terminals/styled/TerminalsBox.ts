import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  isParent: boolean;
  isInput: boolean;
  xPos: number;
  color: string;
}

const TerminalsBox = styled.div<Props>`
  position: absolute;
  min-width: 150px;
  width: 175px;
  top: ${(props) => (props.isParent ? 3 : 5)}px;
  left: ${(props) => (!props.isInput ? props.xPos + "px" : "unset")};
  right: ${(props) => (props.isInput ? props.xPos + "px" : "unset")};
  border: 1px solid ${(props) => props.color};
  background-color: ${Color.White};
  border-radius: 5px;
  transition: right 250ms ease-in-out, left 250ms ease-in-out, top 250ms ease-in-out;
  pointer-events: all;
  z-index: 7;
`;

export default TerminalsBox;
