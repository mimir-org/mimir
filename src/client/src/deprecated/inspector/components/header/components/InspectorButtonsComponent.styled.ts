import styled from "styled-components";
import { FontSize } from "../../../../../assets/font";
import { Color } from "../../../../../assets/color/Color";

export const InspectorButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: space-evenly;
  align-items: center;
  gap: 18px;
  position: relative;
`;

export const InspectorButtonsToggleContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px;
  pointer-events: initial;
  border: 0;
  background: transparent;
  cursor: pointer;

  :disabled {
    color: ${Color.BLACK};
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const InspectorButtonsToggleTitle = styled.span`
  pointer-events: initial;
  font-size: ${FontSize.HEADER};
  height: 100%;
`;
