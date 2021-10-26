import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../compLibrary";

interface Props {
  disabled?: boolean;
}

const SaveButton = styled.button<Props>`
  width: 151px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.White};
  border: 2px solid ${Color.BlueMagenta};
  border-radius: 5px;
  padding: 0px 20px;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  margin-bottom: 15px;

  .icon {
    padding: 0px 6px;
  }

  &:hover {
    border: 2px solid ${Color.BlueMagenta};
  }
`;

export default SaveButton;
