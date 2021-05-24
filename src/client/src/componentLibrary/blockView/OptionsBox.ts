import styled from "styled-components";
import { Color } from "..";

const OptionsBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  border: 1px solid ${Color.Black};
  background-color: ${Color.White};
  border-radius: 0px 5px 5px 5px;
  height: auto;
  width: max-content;
  position: absolute;
  left: 91px;
  top: -1px;
  z-index: 100;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default OptionsBox;
