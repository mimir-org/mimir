import styled from "styled-components";
import { Color } from "../../../compLibrary";

interface Props {
  product: boolean;
  width: number;
  length: number;
}

const NodeBox = styled.div<Props>`
  position: relative;
  height: ${(props) => props.length}px;
  width: ${(props) => props.width}px;
  max-height: inherit;

  .line {
    height: 1px;
    width: auto;
    background-color: ${(props) => (props.product ? Color.ProductSelected : Color.FunctionSelected)};
    position: relative;
    bottom: 15px;
    left: 0px;
  }

  .symbolImg {
    pointer-events: none;
  }
`;

export default NodeBox;
