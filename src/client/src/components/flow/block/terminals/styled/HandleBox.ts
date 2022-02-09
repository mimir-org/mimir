import styled from "styled-components";

interface Props {
  visible: boolean;
  isPartOf: boolean;
  partOfPosX: string;
  partOfPosY: string;
}

const HandleBox = styled.div<Props>`
  position: ${(props) => (props.isPartOf ? "absolute" : "relative")};
  line-height: 0;
  z-index: 100;

  .react-flow__handle-block {
    opacity: ${(props) => (!props.visible ? 0 : 1)};
    transition: top 0.2s ease-out, left 0.2s ease-out, opacity 0.6s ease-out;

    // Place handle within wrapper
    top: ${(props) => (props.isPartOf ? props.partOfPosY : 10)};
    left: ${(props) => (props.isPartOf ? props.partOfPosX : "revert")};
    /* left: 120px;
    right: 0;
    top: 0;
    bottom: 0; */
  }
`;

export default HandleBox;
