import styled from "styled-components";
import { Color } from "../..";

const InspectorTopMenu = styled.div`
  display: flex;
  padding-top: ${(props: { top: number }) =>
    props.top ? props.top + `px` : `0px`};
  background-color: ${(props: { color: string }) => props.color}!important;
  color: ${Color.Black};
  height: 44px;
  border-color: ${Color.Grey};
  border-style: solid;
  border-width: ${(props: { noTopBorder: boolean }) =>
    props.noTopBorder ? `0px 0px 1px 0px` : `1px 0px 1px 0px`};
  width: 100%;
  border-bottom: none;
  border-top: 1px solid ${Color.Grey};
  overflow: hidden;

  &:hover {
    cursor: n-resize;
  }
`;

export default InspectorTopMenu;
