import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize } from "../../../../compLibrary/font";

interface MenuElementStyledProps {
  disabled: boolean;
  bottomLine: boolean;
}

export const MenuElementButton = styled.button<MenuElementStyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  padding: 10px 20px;
  cursor: pointer;
  border-width: 0;
  color: ${Color.BlueMagenta};
  border-bottom: ${(props) => (props.bottomLine ? 1 : 0)}px solid ${Color.Grey};
  text-align: left;

  :disabled {
    cursor: not-allowed;
  }

  :hover:not(:disabled) {
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }

  :last-child {
    border-radius: 0 0 10px 10px;
  }
`;

export const MenuElementText = styled.span`
  font-size: ${FontSize.Standard};
`;
