import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

/** Styled component that displays the drop-down menu for the ConnectViewMenu. */
const ConnectViewMenu = styled.div`
  border: 2px solid ${Color.FunctionTab};
  background-color: ${Color.White};
  border-radius: 5px;
  width: max-content;
  position: absolute;
  bottom: ${(props: { bottom: number }) => props.bottom}px;
  z-index: 1;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default ConnectViewMenu;
