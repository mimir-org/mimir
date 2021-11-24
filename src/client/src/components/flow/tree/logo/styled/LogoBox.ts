import styled from "styled-components";

const LogoBox = styled.div`
  pointer-events: none;
  position: relative;
  top: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  width: 60px;
  left: 60px;

  .logo {
    position: relative;
    display: flex;
    height: inherit;
    width: inherit;
    top: 0px;
  }
`;

export default LogoBox;
