import styled from "styled-components";

const OffPageBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  z-index: 5 !important;
  bottom: 31px;

  .logo {
    display: flex;
    height: 30px;
    width: 35px;
    left: 3px;
    position: relative;
    pointer-events: none;
  }
`;

export default OffPageBox;
