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
  border-right: 1px solid ${Color.LIGHT_SILVER};
  padding-left: 5px;
  width: 180px;
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
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * Box to wrap the OffPageIcon and the OffPage checkbox
 */
export const TerminalOffPageBox = styled.span`
  display: flex;
  gap: 5px;
  height: 20px;
  margin-top: 3px;

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }
`;

/**
 * Box for the OffPageIcon
 */
export const OffPageIconBox = styled.div`
  display: flex;
  align-items: center;
  width: 25px;
  padding-top: 4px;
  margin: 0px 4px;
`;

/**
 * Box for the OffPage checkbox
 */
export const OffPageCheckboxWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  right: 5px;
`;
