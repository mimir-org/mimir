import styled from "styled-components";
import { Color } from "..";

const OptionsBox = styled.div`
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
  border: 1px solid ${Color.Black};
  background-color: ${Color.White};
  border-radius: 0px 5px 5px 5px;
  height: auto;
  width: 125px;
  position: absolute;
  left: 91px;
  top: -1px;

  .button {
    position: absolute;
    right: 3px;
  }
`;

export default OptionsBox;
