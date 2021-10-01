import styled from "styled-components";
import { Size } from "../../../../../compLibrary";

const Block = styled.div`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  height: ${Size.BlockView_Height}px;
  border-radius: 10px;
  border: 2px solid;

  width: ${(props) =>
    props.splitView ? Size.SplitView_Width : Size.BlockView_Width}px;
`;

export default Block;
