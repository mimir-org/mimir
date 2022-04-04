import styled from "styled-components";

interface HandleContainerProps {
  isElectro: boolean;
}

export const HandleContainer = styled.div<HandleContainerProps>`
  display: flex;
  gap: 4px;
  flex-direction: ${(props) => (props.isElectro ? "row" : "column")};
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;

interface HandleBoxProps {
  visible: boolean;
}

export const HandleBox = styled.div<HandleBoxProps>`
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
