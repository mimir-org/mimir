import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../../../compLibrary/font";

export const LibraryTabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: inherit;
  border-bottom: 1px solid ${Color.GREY};
  align-items: center;
`;

interface LibraryTabHeaderProps {
  isActive: boolean;
}

export const LibraryTabHeader = styled.div<LibraryTabHeaderProps>`
  display: flex;
  min-width: 73px;
  background-color: ${(props) => !props.isActive && Color.LIGHT_GREY};
  pointer-events: initial;
  box-sizing: border-box;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  border: ${(props) => (props.isActive ? "1px solid" : "0px")};
  border-color: ${Color.BATTLESHIP_GREY};
  border-bottom: ${(props) => (props.isActive ? "2px solid" + Color.GHOST_WHITE : "0px")};
  height: ${(props) => (props.isActive ? 39 : 31)}px;
  margin-left: 5px;
  margin-top: ${(props) => (props.isActive ? 3 : 8)}px;
  padding: ${(props) => (props.isActive ? "10px 10px 0px 10px;" : "5px 9px 0px 9px")};

  :hover {
    cursor: pointer;
  }
`;

export const LibraryTabHeaderText = styled.p`
  color: ${Color.BLACK};
  font-size: ${FontSize.SUBHEADER};
  font-family: ${FontType.STANDARD};
  white-space: nowrap;
  margin: 0;
  text-align: center;
  width: 100%;
`;
