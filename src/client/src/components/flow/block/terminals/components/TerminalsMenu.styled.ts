import styled from "styled-components";
import { Color } from "../../../../../assets/color/Color";

interface TerminalsBoxProps {
  isInput: boolean;
  menuOffset: string;
  color: string;
}

/**
 * Styled component for the main box in the terminals menu.
 */
export const TerminalsBox = styled.div<TerminalsBoxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: -2px;
  right: ${(props) => (props.isInput ? `calc(100% + ${props.menuOffset})` : "revert")};
  left: ${(props) => (!props.isInput ? `calc(100% + ${props.menuOffset})` : "revert")};
  border: 1px solid ${(props) => props.color};
  background-color: ${Color.WHITE};
  border-radius: 5px;
  transition: right 250ms ease-in-out, left 250ms ease-in-out, top 250ms ease-in-out;
  pointer-events: all;
  z-index: 1;
`;
