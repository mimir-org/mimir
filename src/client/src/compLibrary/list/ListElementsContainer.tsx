import styled from "styled-components";
import { Color } from "../../compLibrary";

const ListElementsContainer = styled.div`
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  div:nth-child(odd) {
    background-color: ${(props: { background: boolean }) =>
      props.background === false ? "" : Color.LightPurple};
  }
`;

export default ListElementsContainer;
