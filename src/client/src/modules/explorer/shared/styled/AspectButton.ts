import styled from "styled-components";

interface Props {
  isHidden?: boolean;
  isLocked?: boolean;
  isVisible?: boolean;
}

export const AspectButton = styled.button<Props>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  margin: 0;
  border: 0;
  opacity: ${(props) => (props.isLocked || props.isHidden ? 0.5 : 1)};
  :hover:not(:disabled) {
    opacity: ${(props) => (props.isHidden || props.isLocked ? 1 : 0.5)};
  }
  :disabled {
    cursor: not-allowed;
  }
`;
