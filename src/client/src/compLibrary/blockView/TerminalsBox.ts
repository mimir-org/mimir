import styled from "styled-components";
import { Color } from "..";

const TerminalsBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  border: 2px solid;
  border-color: ${(props) =>
    props.isLocation ? Color.LocationTab : Color.FunctionTab};
  background-color: ${Color.White};
  border-radius: 5px;
  height: auto;
  width: max-content;
  min-width: 200px;
  position: absolute;
  left: ${(props) => (props.isParent ? props.width + 5 : props.width + 2)}px;
  top: ${(props) => (props.isParent ? "-1px" : "-2px")};
  z-index: 1;

  .button {
    position: absolute;
    right: 8px;
  }
`;

export default TerminalsBox;
