import styled from "styled-components";

const NodeBox = styled.div`
  z-index: 1200;
  width: ${(props) => props.width ?? "100"}px;
  height: ${(props) => props.height ?? "47"}px;
  text-align: center;
  position: ${(props) => props.function && "absolute"};
  top: ${(props) => props.function && "0px"};
  right: ${(props) => props.function && "0px"};
  padding-top: ${(props) => props.function && "10px"};
`;

export default NodeBox;
