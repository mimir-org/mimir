import styled from "styled-components";
import { Color } from "../../colors/Color";
import { FontSize } from "../../font";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px;
  padding: 6px;
  height: 28px;
  min-width: 66px;
  cursor: pointer;
  pointer-events: initial;
  box-shadow: inset 0 0 0 1.5px ${Color.BATTLESHIP_GREY};
  border-radius: 4px;
  font-size: ${FontSize.STANDARD};
  background-color: ${Color.WHITE};

  :disabled {
    box-shadow: inset 0 0 0 1px ${Color.BATTLESHIP_GREY};
    color: ${Color.DAVYS_GREY};
    pointer-events: none;
  }

  :hover {
    box-shadow: inset 0 0 0 2px ${Color.BATTLESHIP_GREY};
  }

  :active {
    box-shadow: inset 0 0 0 2px ${Color.RUSSIAN_VIOLET};
  }
`;
