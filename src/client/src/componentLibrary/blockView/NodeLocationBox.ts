import styled from "styled-components";
import { Size } from "..";

const NodeLocationBox = styled.div`
  width: ${(props) => (props.type ? Size.Node_Width : props.width)};
  height: ${(props) => (props.type ? Size.Node_Height : props.length)};
  text-align: center;
  position: ${(props) => props.type && "absolute"};
  top: ${(props) => props.type && "0px"};
  right: ${(props) => props.type && "0px"};
  background-color: lawngreen;

  .node-name {
    display: inline-block;
    padding-top: 6px;
  }
`;

export default NodeLocationBox;
