import styled from "styled-components";

interface Props {
  visible: boolean;
}

const HandleBox = styled.div<Props>`
  position: relative;
  line-height: 0;

  .react-flow__handle-block {
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    transition: top 0.2s ease-out, left 0.2s ease-out;

    // Place handle within wrapper
    top: 0;
    left: revert;
    right: revert;
    bottom: revert;
    transform: revert;
  }
`;

export default HandleBox;
