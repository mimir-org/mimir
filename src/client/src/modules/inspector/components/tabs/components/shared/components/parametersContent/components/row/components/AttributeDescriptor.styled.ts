import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../../assets/font";

export const AttributeDescriptorBox = styled.div`
  padding: 12px 35px 5px 12px;
  display: flex;
  flex-direction: row;
`;

export const AttributeDescriptorBody = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  margin-bottom: 5px;
  /* right: 2px; */
  width: 100px;
  /* background: #000; */
`;

export const AttributeDescriptorRow = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-right: 10px; */
  /* width: 200px; */
  /* background: #000; */
`;

export const AttributeDescriptorColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 200px;
`;

interface HeaderProps {
  headerColor: string;
}

export const AttributeDescriptorHeader = styled.div<HeaderProps>`
  background-color: ${(props) => props.headerColor};
  color: ${Color.WHITE};
  font-size: ${FontSize.MEDIUM};
  padding: 4px 2px 0 6px;
  border: 1px solid #65a8ad;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 27px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface TextProps {
  headerColor: string;
}

export const AttributeDescriptorText = styled.div<TextProps>`
  display: flex;
  font-size: ${FontSize.SMALL};
  display: flex;
  border: 1px solid ${(props) => props.headerColor};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 23px;
  min-width: 200px;
  color: ${Color.BLACK};
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-right: 7px;
`;
