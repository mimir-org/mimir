import styled from "styled-components";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize, FontType, FontWeight } from "../../../../../../../../assets/font";

interface LibNodeCollectionContainerProps {
  isOpen: boolean;
}

export const LibNodeCollectionBox = styled.div<LibNodeCollectionContainerProps>`
  display: flex;
  background-color: ${Color.WHITE_SMOKE};
  margin: ${(props) => (props.isOpen ? "2px 0px 2px 0px" : "2px 0px 5px 0px")};
  border: 1px solid ${(props) => (props.isOpen ? Color.BASTILLE : Color.SILVER)};
  border-radius: 5px;
  flex-direction: column;
`;

interface LibNodeCollectionButtonProps {
  isOpen: boolean;
}

export const LibNodeCollectionButton = styled.button<LibNodeCollectionButtonProps>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  border-style: solid;
  border-color: ${(props) => (props.isOpen ? Color.BASTILLE : Color.SILVER)};
  border-width: ${(props) => (props.isOpen ? "0px 0px 1px 0px" : "0px")} !important;
  border-radius: 3px;
  background-color: ${Color.WHITE} !important;
  font-size: ${FontSize.SUBHEADER};
  font-family: ${FontType.STANDARD};
  padding-left: 10px;
  padding-right: 14px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

interface LibNodeCollectionButtonTextProps {
  isOpen: boolean;
}

export const LibNodeCollectionButtonText = styled.span<LibNodeCollectionButtonTextProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-size: ${FontSize.STANDARD};
  font-weight: ${(props) => (props.isOpen ? FontWeight.BOLD : FontWeight.NORMAL)};
`;
