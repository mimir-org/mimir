import styled from "styled-components";

const OffPageBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  z-index: 5 !important;

  .logo {
    display: flex;
    height: 35px;
    width: 35px;
    position: relative;
    bottom: 16px;
    left: 4px;
    pointer-events: none;
  }
`;

export default OffPageBox;
