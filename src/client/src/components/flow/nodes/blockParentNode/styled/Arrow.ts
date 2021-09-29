import styled from "styled-components";

const Arrow = styled.div`
  position: absolute;
  top: 4px;
  left: ${(props) => props.left}px;

  &:hover {
    cursor: pointer;
  }
`;

export default Arrow;
