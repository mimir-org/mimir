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
    height: 15px;
    top: 58px;
    left: 58px;
  }

  &:hover {
    cursor: all-scroll;
  }
`;

export default ResizeButton;
