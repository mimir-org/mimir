import styled from "styled-components";
import { Color } from "../../../compLibrary";

const NodeBox = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
  max-height: inherit;

  .line {
    height: 1px;
    width: auto;
    background-color: ${(props: { function: boolean }) =>
      props.function ? Color.FunctionSelected : Color.ProductSelected};
    position: relative;
    bottom: 15px;
    left: 0px;
  }
`;

export default NodeBox;
