import styled from "styled-components";

interface Props {
  isInspectorOpen: boolean;
}

const ResizePanel = styled.div<Props>`
  position: absolute;
  height: 44px;
  width: 100%;

  &:hover {
    cursor: ${(props) => (props.isInspectorOpen ? "n-resize" : "inherit")};
  }
`;

export default ResizePanel;
