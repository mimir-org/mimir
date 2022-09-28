import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../../assets/font";

interface BodyProps {
  isEven: boolean;
}

export const AttributeDescriptorBody = styled.div<BodyProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-right: 10px;
  width: 200px;
`;

export const AttributeDescriptorRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 200px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.headerColor};
  color: ${Color.WHITE};
  font-size: ${FontSize.MEDIUM};
  min-width: 200px;
  border: 1px solid #65a8ad;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 27px;
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

export const AttributeDescriptorBox = styled.div`
  padding: 12px 35px 5px 12px;
  display: flex;
  flex-direction: row;
`;
