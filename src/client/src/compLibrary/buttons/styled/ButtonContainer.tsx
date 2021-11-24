import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 94px;
  height: 34px;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  margin: 10px 0px;
  padding-left: 10px;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  .button-text {
    margin: auto;
    padding-left: 5px;
  }

  &:hover {
    border: 2px solid ${Color.BlueMagenta};
  }
`;

export default ButtonContainer;
