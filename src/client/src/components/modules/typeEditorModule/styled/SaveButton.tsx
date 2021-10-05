import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const SaveButton = styled.button`
  width: 161px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  padding: 15px 25px;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  margin: auto;
  margin-top: -36px;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};

  .icon {
    position: relative;
    padding: 0px 15px;
  }

  &:hover {
    border: 2px solid ${Color.BlueMagenta};
  }
`;

export default SaveButton;
