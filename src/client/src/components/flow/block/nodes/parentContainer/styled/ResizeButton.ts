import styled from "styled-components";

const ResizeButton = styled.div`
  position: absolute;
  bottom: -3px;
  right: -4px;
  height: 30px;
  width: 30px;
  z-index: 1;
  .icon {
    pointer-events: none;
  }
  &:hover {
    cursor: n-resize;
  }
`;

export default ResizeButton;
