import styled from "styled-components";
import { Color } from "../../compLibrary/colors/Color";
import { FontSize } from "../../compLibrary/font";

interface Props {
  disabled: boolean;
}

const TypeEditorButton = styled.button<Props>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 30px;
  padding: 0 10px;
  border: 1px solid ${Color.BASTILLE};
  border-radius: 3px;
  background-color: ${(props) => (props.disabled ? Color.GAINSBORO : Color.WHITE)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${Color.BLACK};
  font-size: ${FontSize.STANDARD};
  white-space: nowrap;
`;

export default TypeEditorButton;
