import styled from "styled-components";
import { Color, Size } from "../../../../../compLibrary";

/** Styled component that displays the drop-down menu for the ConnectViewMenu. */
const ConnectViewMenu = styled.div`
  border: 2px solid ${Color.FunctionTab};
  border-bottom: none;
  background-color: ${Color.White};
  border-radius: 5px 5px 0px 0px;
  height: auto;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  top: ${(props) => props.height - 85}px;
  left: -1px;
  /* min-width: ${Size.Node_Width - 10}px; */
  width: 100%;
  z-index: 1;
  position: absolute;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default ConnectViewMenu;
