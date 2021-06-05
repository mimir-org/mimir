import styled from "styled-components";
import { Size } from "..";

const NodeBox = styled.div`
  width: ${(props) => props.width ?? `${Size.Node_Width}`}px;
  height: ${(props) => props.length ?? `${Size.Node_Height}`}px;
  text-align: center;
  position: ${(props) => props.function && "absolute"};
  top: ${(props) => props.function && "0px"};
  right: ${(props) => props.function && "0px"};
`;

export default NodeBox;
