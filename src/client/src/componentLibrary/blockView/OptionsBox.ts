import styled from "styled-components";
import { Color } from "..";

const OptionsBox = styled.div`
  visibility: ${(props) => (props.visible ? "initial" : "hidden")};
  border: 1px solid ${Color.Black};
  background-color: ${Color.White};
  border-radius: 0px 5px 5px 5px;
  height: auto;
  width: 100px;
  position: absolute;
  left: 102px;
  top: -2px;
`;

export default OptionsBox;
