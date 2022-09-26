import styled from "styled-components";
import { Color } from "../../../../../assets/color/Color";

export const MainShit = styled.div`
  display: flex;
  border-bottom: 1px solid ${Color.LIGHT_SILVER};

  &:first-child {
    border-top-left-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom: none;
  }
`;

/**
 * Wrapper for the terminal element in the menu
 */
export const TerminalsElementBox = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${Color.LIGHT_SILVER};
  padding-left: 5px;
  width: 170px;
  height: 25px;
  gap: 5px;

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const TerminalIconBox = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  line-height: 2.5;
  width: 100%;
  height: 100%;

  .icon {
    height: auto;
    margin-right: 12px;
  }
`;

/**
 * Box to wrap the OffPageIcon and the OffPage checkbox
 */
export const TerminalOffPageBox = styled.span`
  display: flex;
  justify-content: flex-end;
  flex: auto;
  max-width: 60px;
  height: inherit;

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
  height: 100%;
  width: 45px;
  padding: 4px 0px 0px 8px;
  margin-right: 5px;
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
