import styled from "styled-components";
import { FontSize } from "../../../../../../../../../../../assets/font";
import { Color } from "../../../../../../../../../../../assets/color/Color";

export const MenuWrapper = styled.div`
  position: relative;
  bottom: 26px;
  width: 250px;
  left: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};

  .label {
    margin-bottom: 4px;
  }
`;

interface MenuHeaderProps {
  open: boolean;
}

export const MenuHeader = styled.div<MenuHeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  width: 151px;
  background-color: ${(props) => props.color};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${FontSize.TINY};
  color: ${Color.WHITE};

  p {
    padding-left: 10px;
    text-decoration: ${(props) => props.open && "underline"};
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${(props) => props.color};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 28px;
  left: 0;
  width: 60%;
  max-height: 138px;
  overflow-y: auto;
  z-index: 1;

  div:not(:first-child) {
    border-top: 1.5px solid ${(props) => props.color};
  }
`;

export const MenuListItem = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 5px;
  height: 25px;
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
  background-color: ${Color.WHITE};
  cursor: pointer;
  overflow: hidden;

  & > span {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  :hover {
    background-color: ${(props) => props.color};
    span {
      text-decoration: underline;
    }
    .tooltipText {
      visibility: visible;
    }
  }
`;
