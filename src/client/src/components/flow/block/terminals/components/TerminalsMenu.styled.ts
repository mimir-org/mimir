import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors/Color";

interface TerminalsBoxProps {
  isInput: boolean;
  menuOffset: string;
  color: string;
}

export const TerminalsBox = styled.div<TerminalsBoxProps>`
  position: absolute;
  width: 175px;
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
