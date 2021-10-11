import styled from "styled-components";
import { Color } from "../../../compLibrary";

interface Props {
  function?: boolean;
}

const NodeBox = styled.div<Props>`
  position: relative;
  height: inherit;
  width: inherit;
  max-height: inherit;

  .line {
    height: 1px;
    width: auto;
    background-color: ${(props) => (props.function ? Color.FunctionSelected : Color.ProductSelected)};
    position: relative;
    bottom: 15px;
    left: 0px;
  }
`;

export default NodeBox;
