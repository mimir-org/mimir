import styled from "styled-components";

const ListElementsContainer = styled.div`
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  div:nth-child(odd) {
    background-color: ${(props: { background: boolean }) =>
      props.background === false ? "" : "rgba(0, 112, 121, 0.15)"};
  }
`;

export default ListElementsContainer;
