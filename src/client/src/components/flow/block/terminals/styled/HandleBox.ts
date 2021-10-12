import styled from "styled-components";

interface Props {
  top: string;
  left: string;
  visible: boolean;
}

/** Styled component for the terminals displayed on a node */
const HandleBox = styled.div<Props>`
  .react-flow__handle-block {
    position: absolute;
    visibility: ${(props) => !props.visible && "hidden"} !important;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
  }
`;

export default HandleBox;
