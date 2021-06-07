import styled from "styled-components";
import { Color } from "..";

const TerminalsBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  border: 1px solid ${Color.Black};
  background-color: ${Color.White};
  border-radius: 0px 5px 5px 5px;
  height: auto;
  width: max-content;
  position: absolute;
  left: ${(props) => props.width}px;
  top: -1px;
  z-index: 1;

  .button {
    position: absolute;
    right: 8px;
  }
`;

export default TerminalsBox;
