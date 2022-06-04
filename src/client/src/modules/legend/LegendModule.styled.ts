import styled from "styled-components";
import { Size } from "../../compLibrary/size/Size";
import { Color } from "../../assets/color/Color";
import { FontSize } from "../../assets/font";

export const LegendBody = styled.div`
  width: ${Size.MODULE_OPEN}px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 265px;
  padding: 0 15px 10px 15px;
`;

export const LegendElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Color.WHITE};
  padding: 10px;
  color: ${Color.BLACK};
  font-size: ${FontSize.MEDIUM};
  width: auto;

  :first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  :last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: initial;
  }
`;

export const LegendColor = styled.span`
  width: 90px;
  height: 2px;
  background-color: ${(props: { color: string }) => props.color};
`;
