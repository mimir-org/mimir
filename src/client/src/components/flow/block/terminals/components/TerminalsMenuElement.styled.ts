import styled from "styled-components";
import { Color } from "../../../../../assets/color/Color";
import { FontSize } from "../../../../../assets/font";

export const TerminalsElementBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5px;
  padding-left: 5px;
  height: 25px;
  border-bottom: 1px solid ${Color.LIGHT_SILVER};
  font-size: ${FontSize.TINY};
  color: ${Color.BLACK};

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }

  :first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  :last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom: none;
  }
`;

export const TerminalCheckboxWrapper = styled.div``;

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

export const OffPageIconBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 45px;
  padding: 4px 0px 0px 5px;
  margin-right: 5px;
  border-left: 1px solid ${Color.LIGHT_SILVER};
`;

export const OffPageCheckboxWrapper = styled.div`
  position: relative;
  right: 5px;
`;
