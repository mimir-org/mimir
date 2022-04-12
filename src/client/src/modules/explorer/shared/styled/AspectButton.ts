import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors/Color";

interface Props {
  hidden?: boolean;
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
  border-right: 2px solid ${Color.BATTLESHIP_GREY};
  opacity: ${(props) => (props.isLocked || props.hidden ? 0.5 : 1)};

  :hover {
    opacity: ${(props) => (props.hidden || props.isLocked ? 1 : 0.5)};
  }
`;
