import styled from "styled-components";
import { Color } from "../..";

const InspectorTopMenu = styled.div`
  display: flex;
  padding-top: ${(props: { top: number }) =>
    props.top ? props.top + `px` : `0px`};
  background-color: ${Color.DeepCyanTransparent};
  color: ${Color.Black};
  height: 34px;
  border-color: ${Color.Grey};
  border-style: solid;
  border-width: ${(props: { noTopBorder: boolean }) =>
    props.noTopBorder ? `0px 0px 1px 0px` : `1px 0px 1px 0px`};
  width: 100%;
  border-bottom: none;
  overflow: hidden;

  &::after {
    content: "";
    background-color: #ccc;
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    cursor: n-resize;
  }
`;

export default InspectorTopMenu;
