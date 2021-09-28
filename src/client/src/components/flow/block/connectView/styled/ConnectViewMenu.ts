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
  margin-top: ${(props) => props.height - 45}px;
  left: -2px;
  min-width: ${Size.Node_Width}px;
  z-index: 1;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default ConnectViewMenu;
