import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary/font";

interface InspectorButtonRowContainerProps {
  visible: boolean;
}

export const InspectorButtonRowContainer = styled.div<InspectorButtonRowContainerProps>`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
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

  :hover {
    cursor: pointer;
  }
`;

export const InspectorButtonRowToggleTitle = styled.span`
  pointer-events: initial;
  font-size: ${FontSize.HEADER};
  height: 100%;

  :hover {
    cursor: pointer;
  }
`;
