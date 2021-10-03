import styled from "styled-components";
import { Color, Size } from "../../../../../compLibrary";

const Block = styled.div`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  height: ${Size.BlockView_Height - 4}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.DarkGrey};
  width: ${(props) => (props.splitView ? Size.SplitView_Width - 4 : Size.BlockView_Width - 4)}px;
`;

export default Block;
