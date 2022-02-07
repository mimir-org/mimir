import styled from "styled-components";

const LogoBox = styled.div`
  height: 20px;
  width: 50px;
  align-self: flex-start;
  pointer-events: none;
  margin-left: 10px;

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;

export default LogoBox;
