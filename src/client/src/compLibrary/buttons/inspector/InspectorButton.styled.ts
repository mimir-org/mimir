import styled from "styled-components";
import { Color } from "../../../assets/color/Color";
import { FontSize } from "../../../assets/font";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px;
  padding: 6px;
  height: 28px;
  min-width: 62px;
  max-width: 79px;
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
    cursor: not-allowed;
    opacity: 0.5;
  }

  :hover {
    box-shadow: inset 0 0 0 2px ${Color.BATTLESHIP_GREY};
  }

  :active {
    box-shadow: inset 0 0 0 2px ${Color.RUSSIAN_VIOLET};
  }
`;

export const InspectorLockSpinner = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  margin: 20px -10px 0 5px;
  transform: translate(-50%, -50%);
`;
