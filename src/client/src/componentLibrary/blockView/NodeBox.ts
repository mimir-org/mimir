import styled from "styled-components";
import { Size } from "..";

const NodeBox = styled.div`
  width: ${Size.Node_Width};
  height: ${Size.Node_Height};
  text-align: center;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: lawngreen;

  .node-name {
    display: inline-block;
    padding-top: 6px;
  }
`;

export default NodeBox;
