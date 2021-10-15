import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

interface Props {
  color: string;
  location: boolean;
  parent: boolean;
  isInput: boolean;
  connectView: boolean;
  splitView: boolean;
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

  right: ${(props) =>
    props.isInput && props.parent && !props.splitView
      ? "955px"
      : props.isInput && props.parent && props.splitView
      ? "657px"
      : props.isInput && !props.parent && !props.connectView && !props.location
      ? "137px"
      : props.isInput && !props.parent && props.connectView
      ? "405px"
      : "unset"};

  left: ${(props) =>
    !props.isInput && props.parent && !props.splitView
      ? "957px"
      : !props.isInput && props.parent && props.splitView
      ? "657px"
      : !props.isInput && !props.parent && !props.connectView
      ? "137px"
      : props.isInput && !props.parent && !props.connectView && props.location
      ? "-162px"
      : !props.isInput && !props.parent && props.connectView
      ? "405px"
      : "unset"};
`;

export default TerminalsMenu;
