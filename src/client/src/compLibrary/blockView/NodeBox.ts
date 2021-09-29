import styled from "styled-components";

const NodeBox = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
  max-height: inherit;

  .node-name {
    display: inline-block;
    padding-top: 15px;
    height: auto;
    width: 95%;
    overflow: hidden;
  }
`;

export default NodeBox;
