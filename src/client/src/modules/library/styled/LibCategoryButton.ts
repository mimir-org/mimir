import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const LibCategoryButton = styled.button<Props>`
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

export default LibCategoryButton;
