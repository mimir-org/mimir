import styled from "styled-components";
import { Color } from "../../../../../../compLibrary";

interface Props {
  selected: boolean;
  width: number;
  length: number;
}

const Block = styled.div<Props>`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.width}px;
  height: ${(props) => props.length}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.DarkGrey};
  background-color: ${Color.White};
`;

export default Block;
