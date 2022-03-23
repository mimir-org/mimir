import styled from "styled-components";

interface Props {
  visible: boolean;
}

const ResizeButton = styled.div<Props>`
visibility: ${(props) => (props.visible ? "visible" : "hidden")}
  position: absolute;
  bottom: 0;
  right: 0;
  height: 80px;
  width: 80px;
  pointer-events: all;
  z-index: 1;

  img {
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
