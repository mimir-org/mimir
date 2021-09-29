import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

/** Styled component that displays the drop-down menu for the ConnectViewMenu. */
const ConnectViewMenu = styled.div`
  border: 2px solid ${Color.FunctionTab};
  background-color: ${Color.White};
  border-radius: 5px;
  height: auto;
  width: max-content;
  position: absolute;
  min-width: 200px;
  top: 4px;
  left: -211px;
  z-index: 1;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default ConnectViewMenu;
