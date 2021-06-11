import styled from "styled-components";

const NodeBox = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.length}px;
  position: relative;
  .node-name {
    display: inline-block;
    padding-top: 6px;
  }
`;

export default NodeBox;