import styled from "styled-components";
import { Color } from "../../../../../assets/color/Color";
import { FontSize } from "../../../../../assets/font";

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
