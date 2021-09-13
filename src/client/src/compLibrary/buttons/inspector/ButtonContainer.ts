import styled from "styled-components";
import { Color, FontSize } from "../..";

const ButtonContainer = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  border: solid 1px ${Color.BlueMagenta};
  border-radius: 4px;
  font-size: ${FontSize.Standard};
  background-color: ${Color.White};
  width: 75px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  margin-top: 10px;

  :hover {
    background-color: #e6e6e6;
  }
`;
export default ButtonContainer;