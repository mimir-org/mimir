import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary/font";
import { Color } from "../../../../../compLibrary/colors/Color";

export const InspectorButtonRowContainer = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: space-evenly;
  align-items: center;
  gap: 18px;
  position: relative;
`;

export const InspectorButtonRowToggleContainer = styled.button`
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

export const InspectorButtonRowToggleTitle = styled.span`
  pointer-events: initial;
  font-size: ${FontSize.HEADER};
  height: 100%;
`;
