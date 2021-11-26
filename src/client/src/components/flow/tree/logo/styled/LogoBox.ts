import styled from "styled-components";

const LogoBox = styled.div`
  min-height: 20px;
  max-height: 20px;
  align-self: flex-start;
  pointer-events: none;

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;

export default LogoBox;