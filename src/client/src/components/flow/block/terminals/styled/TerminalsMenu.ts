import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

/** Styled component that displays the drop-down menu for a nodes' terminals. */
const TerminalsMenu = styled.div`
  border: 1px solid;
  border-color: ${(props: { isLocation: boolean }) =>
    props.isLocation ? Color.LocationTab : "#FBC913"}; // TODO: fix color
  background-color: ${Color.White};
  border-radius: 5px;
  z-index: 4;
  min-width: 150px;
  width: max-content;
  position: absolute;
  top: ${(props: { isParent: boolean }) => (props.isParent ? 0 : 5)}px;

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
`;

export default TerminalsMenu;
