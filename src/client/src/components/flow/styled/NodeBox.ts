import styled from "styled-components";
import { Color } from "../../../compLibrary";

const NodeBox = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
  max-height: inherit;

  .line {
    border: 1px solid;
    border-color: ${(props: { function: boolean }) => (props.function ? Color.FunctionSelected : Color.ProductSelected)};
    position: relative;
    bottom: 36px;
  }
`;

export default NodeBox;
