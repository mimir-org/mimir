import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../compLibrary/font";

interface ElementBoxProps {
  isHeader: boolean;
  isSubHeader: boolean;
  indent: number;
}

export const ElementBox = styled.label<ElementBoxProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  margin-top: ${(props) => (props.isHeader || props.isSubHeader) && "7px"};
  padding-left: ${(props) => props.indent * 8}px;
  background-color: ${(props) => (props.isHeader ? Color.GreyLight : Color.White)};

  &:hover {
    cursor: pointer;
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

interface ElementLabelProps {
  isHeader: boolean;
  isSubHeader: boolean;
}

export const ElementLabel = styled.span<ElementLabelProps>`
  position: relative;
  bottom: 0.5px;
  font-size: ${FontSize.Standard};
  font-weight: ${(props) => (props.isHeader || props.isSubHeader) && FontWeight.Bold};
  width: 220px;
`;
