import styled from "styled-components";
import { Color } from "../../../../assets/color/Color";

interface InspectorHeaderContainerProps {
  top?: number;
  color: string;
}

export const InspectorHeaderContainer = styled.div<InspectorHeaderContainerProps>`
  display: flex;
  color: ${Color.BLACK};
  height: 44px;
  width: 100%;
  overflow: hidden;
  padding-top: ${(props) => (props.top ? props.top : 0)}px;
  background-color: ${(props) => props.color}!important;
`;

export const InspectorHeaderNodeInfo = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  margin: 14px 0 10px 10px;
  font-weight: bold;
`;

export const InspectorHeaderNodeInfoText = styled.span``;
