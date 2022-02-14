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

  .react-flow__handle-block {
    visibility: ${(props) => (!props.visible ? "hidden" : "visible")};
    transition: top 0.2s ease-out, left 0.2s ease-out;

    // Place handle within wrapper
    top: ${(props) => (props.isPartOf ? props.partOfPosY : 0)};
    left: ${(props) => (props.isPartOf ? props.partOfPosX : "revert")};
    right: revert;
    bottom: revert;
    transform: revert;
  }
`;

export default HandleBox;
