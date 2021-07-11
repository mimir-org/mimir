import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const SaveButton = styled.button`
  width: 161px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  padding: 15px 25px;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  margin: auto;
  margin-top: 12px;

  .icon {
    position: relative;
    padding: 0px 15px;
  }

  &:hover {
    border: 2px solid ${Color.DeepCyan};
  }
`;

export default SaveButton;
