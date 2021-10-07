import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const SaveButton = styled.button`
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
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};
  position: absolute;
  bottom: 16px;

  .icon {
    padding: 0px 6px;
    width: 24px;
    height: 24px;
  }

  &:hover {
    border: 2px solid ${Color.BlueMagenta};
  }
`;

export default SaveButton;
