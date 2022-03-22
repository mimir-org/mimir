import styled from "styled-components";

export interface InspectorResizePanelProps {
  isInspectorOpen: boolean;
}

export const InspectorResizePanel = styled.div<InspectorResizePanelProps>`
  position: absolute;
  height: 44px;
  width: 100%;

  &:hover {
    cursor: ${(props) => (props.isInspectorOpen ? "n-resize" : "inherit")};
  }
`;
