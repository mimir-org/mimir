import { Color } from "assets/color/Color";
import { FontSize, FontWeight } from "assets/font";
import styled from "styled-components";

interface Props {
  visible: boolean;
  orientation: "Left" | "Right";
  borderColor: string;
}

export const OverflowComponentContainer = styled.div<Props>`
  position: relative;
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  pointer-events: all;
  z-index: 2;
  &.menu-icon {
    pointer-events: none;
  }
  margin-left: ${(props) => (props.orientation === "Left" ? `60px` : 0)};
  margin-right: ${(props) => (props.orientation === "Right" ? `60px` : 0)};
`;

export const OverflowComponentTitle = styled.span`
  font-size: ${FontSize.STANDARD};
  font-weight: ${FontWeight.BOLD};
`;

export const OverflowItemsContainer = styled.div<Props>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  transition: right 250ms ease-in-out, left 250ms ease-in-out, top 250ms ease-in-out;
  pointer-events: all;
  z-index: 1;

  width: 150px;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${Color.WHITE};
  border-radius: 5px;

  position: absolute;
  right: ${(props) => (props.orientation === "Left" ? `calc(100% + 10px)` : "revert")};
  left: ${(props) => (props.orientation === "Right" ? `calc(100% + 10px)` : "revert")};
  top: -2px;
`;

export const OverflowItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
  width: 100%;
  height: 25px;
  gap: 5px;
  font-size: ${FontSize.SMALL};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid ${Color.LIGHT_SILVER};

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  &:last-child {
    border-bottom: none !important;
  }
`;

export const IconBox = styled.div`
  display: flex;
  width: 15px;
`;

export const NameBox = styled.span`
  max-width: 100%;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AddRemoveIconBox = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  padding: 0px;
  margin: 0;
  align-items: center;

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }

  svg {
    margin: auto auto;
    height: 20px;
  }
`;
