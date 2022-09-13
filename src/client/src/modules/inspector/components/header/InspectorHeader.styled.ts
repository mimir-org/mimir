import styled from "styled-components";
import { Color } from "../../../../assets/color/Color";

interface InspectorHeaderBoxProps {
  top?: number;
  color: string;
}

export const InspectorHeaderBox = styled.div<InspectorHeaderBoxProps>`
  display: flex;
  color: ${Color.BLACK};
  height: 44px;
  width: 100%;
  overflow: hidden;
  padding-top: ${(props) => (props.top ? props.top : 0)}px;
  background-color: ${(props) => props.color}!important;
`;
