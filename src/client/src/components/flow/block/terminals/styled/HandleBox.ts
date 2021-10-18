import styled from "styled-components";

interface Props {
  top: number;
  left: number;
  visible: boolean;
}

/** Styled component for the terminals displayed on a node */
const HandleBox = styled.div<Props>`
  .react-flow__handle-block {
    position: absolute;
    visibility: ${(props) => !props.visible && "hidden"} !important;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
  }
`;

export default HandleBox;
