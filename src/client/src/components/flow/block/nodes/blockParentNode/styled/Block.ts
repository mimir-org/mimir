import styled from "styled-components";
import { Color, Size } from "../../../../../../compLibrary";

interface Props {
  selected: boolean;
}

const Block = styled.div<Props>`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  height: ${Size.BlockView_Height - 4}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.DarkGrey};
  background-color: ${Color.White};
  width: ${Size.BlockView_Width - 4}px;
`;

export default Block;
