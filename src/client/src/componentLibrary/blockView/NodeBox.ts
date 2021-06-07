import styled from "styled-components";
import { Size } from "..";

const NodeBox = styled.div`
  width: ${(props) => (props.location ? props.width : Size.Node_Width)}px;
  height: ${(props) => (props.location ? props.length : Size.Node_Height)}px;

  .node-name {
    display: inline-block;
    padding-top: 6px;
  }
`;

export default NodeBox;
