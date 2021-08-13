import styled from "styled-components";
import { Color } from "../..";

const InspectorBody = styled.div`
  display: flex;
  padding-top: ${(props: { top: number }) =>
    props.top ? props.top + `px` : `0px`};
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : `${Color.LightGrey}`};
  color: ${Color.Black};
  height: 34px;
  border-color: ${Color.Grey};
  border-style: solid;
  border-width: ${(props: { noTopBorder: boolean }) =>
    props.noTopBorder ? `0px 0px 1px 0px` : `1px 0px 1px 0px`};
  width: 100%;
  border-bottom: none;
  border-top: none;
  overflow: hidden;
`;

export default InspectorBody;
