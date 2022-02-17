import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { FontSize, FontType, FontWeight } from "../../../../../../../compLibrary/font";

interface LibCollectionWrapperProps {
  isOpen: boolean;
}

export const LibCollectionWrapper = styled.div<LibCollectionWrapperProps>`
  display: flex;
  background-color: ${Color.GreyLight};
  margin: ${(props) => (props.isOpen ? "2px 0px 2px 0px" : "2px 0px 5px 0px")};
  border: 1px solid ${(props) => (props.isOpen ? Color.BlueMagenta : Color.GreyLibraryCollectionBorder)};
  border-radius: 5px;
  flex-direction: column;
`;

interface LibCategoryButtonProps {
  isOpen: boolean;
}

export const LibCategoryButton = styled.button<LibCategoryButtonProps>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  border-style: solid;
  border-color: ${(props) => (props.isOpen ? Color.BlueMagenta : Color.GreyLibraryCollectionBorder)};
  border-width: ${(props) => (props.isOpen ? "0px 0px 1px 0px" : "0px")} !important;
  border-radius: 3px;
  background-color: ${Color.White} !important;
  font-size: ${FontSize.SubHeader};
  font-family: ${FontType.Standard};
  padding-left: 10px;
  padding-right: 14px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .expandIcon {
    position: relative;
    left: 3px;
  }
  :hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

interface LibCategoryHeaderProps {
  isOpen: boolean;
}

export const LibCategoryHeader = styled.span<LibCategoryHeaderProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  font-weight: ${(props) => (props.isOpen ? FontWeight.Bold : FontWeight.Normal)};
`;
