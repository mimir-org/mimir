import styled from "styled-components";

const LogoBox = styled.div`
  height: 20px;
  width: 50px;
  align-self: flex-start;
  pointer-events: none;

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;

export default LogoBox;