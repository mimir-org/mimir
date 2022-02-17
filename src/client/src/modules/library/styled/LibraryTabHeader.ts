import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  isActive: boolean;
}

const LibraryTabHeader = styled.div<Props>`
  display: flex;
  min-width: 73px;
  background-color: ${(props) => !props.isActive && Color.GreyLibraryInactiveTab};
  pointer-events: initial;
  box-sizing: border-box;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  border: ${(props) => (props.isActive ? "1px solid" : "0px")};
  border-color: ${Color.GreyInactive};
  border-bottom: ${(props) => (props.isActive ? "2px solid" + Color.GreyLighter : "0px")};
  height: ${(props) => (props.isActive ? 39 : 31)}px;
  margin-left: 5px;
  margin-top: ${(props) => (props.isActive ? 3 : 8)}px;
  padding: ${(props) => (props.isActive ? "10px 10px 0px 10px;" : "5px 9px 0px 9px")};

  p {
    color: ${Color.Black};
    font-size: ${FontSize.SubHeader};
    font-family: ${FontType.Standard};
    white-space: nowrap;
    margin: 0;
    text-align: center;
    width: 100%;
  }

  :hover {
    cursor: pointer;
  }
`;

export default LibraryTabHeader;
