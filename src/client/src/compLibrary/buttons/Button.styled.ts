import styled from "styled-components";
import { Color } from "../../assets/color/Color";
import { FontSize } from "../../assets/font";

export const ButtonBase = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 35px;
  padding: 10px 20px;
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
  border-color: ${Color.BASTILLE};
  border-style: solid;
  cursor: pointer;

  > span {
    max-width: 260px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    overflow: hidden;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :active {
    border-width: 2px;
  }

  :hover:not(:disabled) {
    text-decoration: underline;
  }
`;

export const GreyButton = styled(ButtonBase)`
  background: ${Color.WHITE_SMOKE};
  border-width: 1px;
  border-radius: 2px;
`;

export const WhiteButton = styled(ButtonBase)`
  background: ${Color.WHITE};
  border-width: 1.5px;
  border-radius: 5px;
`;
