import styled from "styled-components";

const NodeBox = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.length}px;
  position: absolute;

  .node-name {
    display: inline-block;
    padding-top: 6px;
    height: auto;
    width: 95%;
    overflow: hidden;
  }
`;

export default NodeBox;
