import styled from "styled-components";
import { Color } from "../../colors";
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
  box-shadow: inset 0 0 0 1.5px ${Color.InspectorGreyBorder};
  border-radius: 4px;
  font-size: ${FontSize.Standard};
  background-color: ${Color.White};

  :disabled {
    box-shadow: inset 0 0 0 1px ${Color.InspectorGreyBorder};
    color: ${Color.GreyHeader};
    pointer-events: none;
  }

  :hover {
    box-shadow: inset 0 0 0 2px ${Color.InspectorGreyBorder};
  }

  :active {
    box-shadow: inset 0 0 0 2px ${Color.InspectorDarkBorder};
  }
`;
