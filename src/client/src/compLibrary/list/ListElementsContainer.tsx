import styled from "styled-components";
import { Color } from "../../compLibrary";

const ListElementsContainer = styled.div`
  position: relative;
  height: calc(100% - 45px);
  border-bottom: black 1px solid;
  overflow-x: hidden;
  overflow-y: scroll;
  overflow-y: overlay;

  div:nth-child(odd) {
    background-color: ${(props: { background: boolean }) => (props.background === false ? "" : Color.LightPurple)};
  }

  div:nth-child(even) {
    background-color: ${(props: { background: boolean }) =>
      props.background === false ? "" : Color.White};
  }

  div:nth-child(n):hover {
    background-color: ${Color.LightBlue};
  }

  :before {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BlueMagenta};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  :after {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BlueMagenta};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export default ListElementsContainer;
