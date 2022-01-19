import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  isInput: boolean;
  menuOffset: string;
  color: string;
}

const TerminalsBox = styled.div<Props>`
  position: absolute;
  width: 175px;
  top: 0;
  right: ${(props) => (props.isInput ? `calc(100% + ${props.menuOffset})` : "revert")};
  left: ${(props) => (!props.isInput ? `calc(100% + ${props.menuOffset})` : "revert")};
  border: 1px solid ${(props) => props.color};
  background-color: ${Color.White};
  border-radius: 5px;
  transition: right 250ms ease-in-out, left 250ms ease-in-out, top 250ms ease-in-out;
  pointer-events: all;
`;

export default TerminalsBox;
