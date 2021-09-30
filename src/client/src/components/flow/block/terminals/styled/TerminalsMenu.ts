import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

/** Styled component that displays the drop-down menu for a nodes' terminals. */
const TerminalsMenu = styled.div`
  border: 2px solid;
  border-color: ${(props) =>
    props.isLocation ? Color.LocationTab : Color.FunctionTab};
  background-color: ${Color.White};
  border-radius: 5px;
  z-index: 4;
  min-width: 150px;
  width: max-content;
  position: absolute;
  top: ${(props) => (props.isParent ? "0px" : "5px")};

  right: ${(props) =>
    props.isInput && props.isParent && !props.splitView
      ? "955px"
      : props.isInput && props.isParent && props.splitView
      ? "50px"
      : props.isInput && !props.isParent && !props.isConnectView
      ? "137px"
      : props.isInput && !props.isParent && props.isConnectView
      ? "405px"
      : "unset"};

  left: ${(props) =>
    !props.isInput && props.isParent && !props.splitView
      ? "957px"
      : !props.isInput && props.isParent && props.splitView
      ? "657px"
      : !props.isInput && !props.isParent && !props.isConnectView
      ? "137px"
      : !props.isInput && !props.isParent && props.isConnectView
      ? "405px"
      : "unset"};

  .button {
    position: absolute;
    right: 8px;
  }
`;

export default TerminalsMenu;
