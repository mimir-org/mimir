import styled from "styled-components";

const LogoBox = styled.div`
  pointer-events: none;
  position: relative;
  top: 5px;
  display: flex;
  align-items: center;
  height: 25px;
  width: 60px;
  left: 50%;
  transform: translateX(-50%);

  .logo {
    position: relative;
    display: flex;
    height: inherit;
    width: inherit;
    top: 0px;
  }
`;

export default LogoBox;
