import { Color } from "assets/color/Color";
import { FontSize } from "assets/font";
import styled from "styled-components";

interface TerminalsBoxProps {
  isInput: boolean;
  menuOffset: string;
  color: string;
}

interface TerminalsButtonBoxProps {
  visible: boolean;
  isInput: boolean;
}

export const TerminalMenuWrapper = styled.span`
  position: relative;
`;

/**
 * Styled component for the main box in the terminals menu.
 */
export const TerminalsBox = styled.div<TerminalsBoxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: -2px;
  right: ${(props) => (props.isInput ? `calc(100% + ${props.menuOffset})` : "revert")};
  left: ${(props) => (!props.isInput ? `calc(100% + ${props.menuOffset})` : "revert")};
  border: 1px solid ${(props) => props.color};
  background-color: ${Color.WHITE};
  border-radius: 5px;
  transition: right 250ms ease-in-out, left 250ms ease-in-out, top 250ms ease-in-out;
  pointer-events: all;
  z-index: 1;
`;

export const TerminalsButtonBox = styled.span<TerminalsButtonBoxProps>`
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  pointer-events: all;
  z-index: 2;

  .menu-icon {
    pointer-events: none;
    position: relative;
    left: ${(props) => (props.isInput ? -1 : 1)}px;
    right: ${(props) => (props.isInput ? 0 : 10)}px;
  }
`;

/**
 * Main wrapper for entire component
 */
export const TerminalElementBox = styled.div`
  display: flex;
  border-bottom: 1px solid ${Color.LIGHT_SILVER};
  /* background: #000; */
  /* width: 300px; */

  &:first-child {
    border-top-left-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom: none;
  }
`;

/**
 * Box to wrap the TerminalIcon and the terminal checkbox
 */
export const TerminalBox = styled.div`
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

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }
`;

/**
 * Box for a terminal icon
 */
export const TerminalIconBox = styled.div`
  display: flex;
  width: 20px;
`;

/**
 * Box for the terminal name
 */
export const TerminalNameBox = styled.span`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * Box for a terminal icon
 */
export const TerminalAddRemoveIconBox = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
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
