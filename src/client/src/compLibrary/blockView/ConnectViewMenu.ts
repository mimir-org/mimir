import styled from "styled-components";
import { Color } from "..";

/** Styled component that displays the drop-down menu for a the ConnectViewMenu. */
const ConnectViewMenu = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  border: 2px solid ${Color.FunctionTab};
  background-color: ${Color.White};
  border-radius: 5px;
  height: auto;
  position: absolute;
  right: ${(props) => props.width + 4}px;
  top: -3px;
  z-index: 1;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default ConnectViewMenu;
