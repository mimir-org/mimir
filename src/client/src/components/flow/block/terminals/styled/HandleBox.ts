import styled from "styled-components";

interface Props {
  visible: boolean;
}

const HandleBox = styled.div<Props>`
  position: relative;
  line-height: 0;
  
  .react-flow__handle-block {
    opacity: ${(props) => (!props.visible ? 0 : 1)};
    transition: top 0.2s ease-out, left 0.2s ease-out, opacity 0.6s ease-out;
    
    // Place handle within wrapper
    top: 0;
    right: revert;
    bottom: revert;
    left: revert;
    transform: revert;
  }
`;

export default HandleBox;
