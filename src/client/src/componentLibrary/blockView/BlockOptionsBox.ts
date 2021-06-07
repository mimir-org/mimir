import styled from "styled-components";
import { Color } from "..";

const BlockOptionsBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  border: 1px solid ${Color.Black};
  background-color: ${Color.White};
  border-radius: 5px 0px 5px 5px;
  height: auto;
  position: absolute;
  right: ${(props) => props.width}px;
  top: -1px;
  z-index: 1;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default BlockOptionsBox;
