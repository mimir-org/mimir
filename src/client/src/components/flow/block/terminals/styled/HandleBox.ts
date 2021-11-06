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
    opacity: ${(props) => (!props.visible ? 0 : 1)};
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;

    transition: opacity 250ms ease-in-out, top 350ms ease-out, left 350ms ease-out;
  }
`;

export default HandleBox;
