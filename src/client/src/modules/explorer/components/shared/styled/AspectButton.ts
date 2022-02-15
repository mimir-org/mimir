import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  isHidden?: boolean;
  isLocked?: boolean;
  isVisible?: boolean;
}

export const AspectButton = styled.button<Props>`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  margin: 0;
  border: 0;
  border-right: 2px solid ${Color.InspectorGreyBorder};
  opacity: ${(props) => (props.isLocked || props.isHidden ? 0.5 : 1)};

  :hover {
    opacity: ${(props) => (props.isHidden || props.isLocked ? 1 : 0.5)};
  }
`;
