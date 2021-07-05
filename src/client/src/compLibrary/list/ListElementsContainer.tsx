import styled from "styled-components";

const ListElementsContainer = styled.div`
  max-height: 230px;
  overflow: hidden;
  overflow-y: auto;

  div:nth-child(odd) {
    background-color: rgba(0, 112, 121, 0.15);
  }
`;

export default ListElementsContainer;
