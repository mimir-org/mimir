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
    top: 12px;
    left: 1px;
    pointer-events: none;
  }
`;

export default OffPageBox;
