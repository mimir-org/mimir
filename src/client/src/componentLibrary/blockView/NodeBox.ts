import styled from "styled-components";
import { Size } from "..";

const NodeBox = styled.div`
  z-index: 1200;
  width: ${(props) => props.width ?? `${Size.Node_Width}`}px;
  height: ${(props) => props.height ?? `${Size.Node_Length}`}px;
  text-align: center;
  position: ${(props) => props.function && "absolute"};
  top: ${(props) => props.function && "0px"};
  right: ${(props) => props.function && "0px"};
  padding-top: ${(props) => props.function && "10px"};
`;

export default NodeBox;
