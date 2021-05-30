import styled from "styled-components";

const TabRow = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  position: absolute;

  &:last-child {
    top: 110px;
    background-color: #e5e5;
  }
`;

export default TabRow;
