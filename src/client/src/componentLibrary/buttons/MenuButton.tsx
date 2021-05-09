import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const MenuButton = styled.button`
  width: 76px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  padding: 0px 6px;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-weight: normal;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  &:hover {
    border: 2px solid ${Color.DeepCyan};
    text-decoration: underline;
  }
`;

export default MenuButton;
