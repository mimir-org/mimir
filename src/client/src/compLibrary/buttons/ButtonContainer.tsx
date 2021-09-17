import styled from "styled-components";
import { Color, FontSize } from "..";

const ButtonContainer = styled.button`
  min-width: 94px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  padding-left: 10px;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  margin: 10px 0px;

  .text {
    margin: auto;
    padding-left: 5px;
  }

  &:hover {
    border: 2px solid ${Color.BlueMagenta};
  }
`;

export default ButtonContainer;
