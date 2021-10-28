import styled from "styled-components";
import { Color, Size } from "../../../../../../compLibrary";

interface Props {
  selected: boolean;
  width: number;
}

const Block = styled.div<Props>`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.width}px;
  height: ${Size.BlockView_Length}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.DarkGrey};
  background-color: ${Color.White};
`;

export default Block;
