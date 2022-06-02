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
  isPartOf: boolean;
  top: string;
  left: string;
}

export const HandleBox = styled.div<HandleBoxProps>`
  position: ${(props) => (props.isPartOf ? "absolute" : "relative")};
  line-height: 0;
  transition: top 0.2s ease-out, left 0.2s ease-out;

  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: revert;

  .react-flow__handle-block {
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    transition: top 0.2s ease-out, left 0.2s ease-out;
  }
`;
