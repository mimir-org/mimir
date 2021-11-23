import styled from "styled-components";

const ResizeButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 80px;
  width: 80px;
  pointer-events: all;
  z-index: 1;

  .icon {
    pointer-events: none;
    position: relative;
    top: 45px;
    left: 45px;
  }

  &:hover {
    cursor: nesw-resize;
  }
`;

export default ResizeButton;
