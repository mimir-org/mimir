import styled from "styled-components";

interface Props {
  yPos: number;
  xPos: number;
  visible: boolean;
}

const HandleBox = styled.div<Props>`
  .react-flow__handle-block {
    position: absolute;
    opacity: ${(props) => (!props.visible ? 0 : 1)};
    top: ${(props) => props.yPos}px;
    left: ${(props) => props.xPos}px;
    transition: top 0.2s ease-out, left 0.2s ease-out, opacity 0.6s ease-out;
  }
`;

export default HandleBox;
