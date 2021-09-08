import styled from "styled-components";
import { Color } from "../..";

const InspectorMenu = styled.div`
  display: flex;
  padding-top: ${(props: { top: number }) =>
    props.top ? props.top + `px` : `0px`};
  background-color: ${(props: { color: string }) => props.color}!important;
  color: ${Color.Black};
  height: 41px;
  border-color: ${Color.Grey};
  border-style: solid;
  border-width: ${(props: { noTopBorder: boolean }) =>
    props.noTopBorder ? `0px 0px 1px 0px` : `1px 0px 1px 0px`};
  width: 100%;
  border-bottom: none;
  border-top: solid 1px ${Color.Grey};
  overflow: hidden;

  &:hover {
    cursor: n-resize;
  }
`;

export default InspectorMenu;
