import styled from "styled-components";

const TabRow = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  position: absolute;

  &:nth-child(2) {
    top: 55px; // TODO: fix
  }
`;

export default TabRow;
