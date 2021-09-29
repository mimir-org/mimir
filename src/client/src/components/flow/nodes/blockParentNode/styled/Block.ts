import styled from "styled-components";
import { Color, Size } from "../../../../../compLibrary";

const Block = styled.div`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  height: ${Size.BlockView_Height}px;
  border-radius: 10px;
  border: 2px solid;
  background-color: ${(props) => !props.location && Color.White};

  border-color: ${(props) =>
    props.location ? Color.LocationTab : Color.FunctionTab};

  width: ${(props) =>
    props.splitView ? Size.SplitView_Width : Size.BlockView_Width}px;
`;

export default Block;
