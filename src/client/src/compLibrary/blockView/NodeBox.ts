import styled from "styled-components";

const NodeBox = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.length}px;
  position: relative;

  img {
    position: relative;
    bottom: 15px;
    pointer-events: none;
  }
`;

export default NodeBox;
