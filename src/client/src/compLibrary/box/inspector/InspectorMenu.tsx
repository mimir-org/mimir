import styled from "styled-components";
import { Color } from "../..";

const InspectorMenu = styled.div`
  display: flex;

  color: ${Color.Black};
  height: 41px;
  width: 100%;
  overflow: hidden;

  padding-top: ${(props: { top: number }) =>
    props.top ? props.top + `px` : `0px`};

  background-color: ${(props: { color: string }) => props.color}!important;

  &:hover {
    cursor: n-resize;
  }
`;

export default InspectorMenu;
