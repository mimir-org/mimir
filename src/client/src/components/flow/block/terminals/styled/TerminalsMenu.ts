import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

/** Styled component that displays the drop-down menu for a nodes' terminals. */
const TerminalsMenu = styled.div`
  border: 2px solid;
  border-color: ${(props) =>
    props.isLocation ? Color.LocationTab : Color.FunctionTab};
  background-color: ${Color.White};
  border-radius: 5px;
  z-index: 2;
  min-width: 190px;
  width: max-content;
  position: absolute;
  left: ${(props) => (props.isParent ? props.width + 5 : props.width + 3)}px;
  top: ${(props) => (props.isParent ? "-1px" : "-3px")};

  .button {
    position: absolute;
    right: 8px;
  }
`;

export default TerminalsMenu;
