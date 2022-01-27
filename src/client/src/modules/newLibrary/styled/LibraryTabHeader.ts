import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  isActive: boolean;
}

const LibraryTabHeader = styled.div<Props>`
  display: flex;
  min-width: 73px;
  background-color: ${(props) => (props.isActive ? "transparent" : Color.GreyLibraryInactiveTab)};
  pointer-events: initial;
  box-sizing: border-box;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  border: 1.5px solid ${Color.BlueMagenta};
  border-bottom: ${(props) => (props.isActive ? "3px solid" + Color.GreyLighter : "0px")};
  margin-right: 4px;
  height: ${(props) => (props.isActive ? 41 : 32)}px;
  margin-top: ${(props) => (props.isActive ? 3 : 7)}px;
  padding: ${(props) => (props.isActive ? "12px 10px 0px 10px;" : "7px 9px 0px 9px")};
  box-shadow: -4px 0 4px -5px rgba(0, 0, 0, 0.4), 4px 0 3px -5px rgba(0, 0, 0, 0.4);

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
