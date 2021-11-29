import styled from "styled-components";

interface Props {
  isActive: boolean;
}

const Navigation = styled.div<Props>`
  display: flex;
  position: relative;
  justify-content: center;
  padding: 10px 4px 10px 0px;
  cursor: ${(props) => (props.isActive ? "pointer" : "default")};
  pointer-events: all;

  .img {
    pointer-events: none;
  }
`;

export default Navigation;
