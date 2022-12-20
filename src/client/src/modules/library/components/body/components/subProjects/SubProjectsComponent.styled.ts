import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { Color } from "../../../../../../assets/color/Color";
import { FontSize, FontType } from "../../../../../../assets/font";

type SubProjectComponentButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  selected?: string;
};

type SubProjectItemContainerProps = {
  visible?: boolean;
};

export const SubProjectsText = styled.p`
  text-align: center;
  color: ${Color.BLACK};
  font-size: ${FontSize.MEDIUM};
  font-family: ${FontType.STANDARD};
  padding: 10px 50px;
`;

export const SubProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
`;

export const SubProjectsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  margin: 3px 0px;
`;

export const SubProjectHeader = styled.button<SubProjectComponentButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: calc(100% - 20px);
  width: 100%;
  height: 30px;
  border: 1px;
  border-color: ${(props) => (props.selected === props.id ? Color.BASTILLE : Color.SILVER)};
  border-style: solid;
  border-radius: 5px;
  background-color: ${Color.WHITE};
  font-size: ${FontSize.MEDIUM};
  font-family: ${FontType.STANDARD};
  font-weight: ${(props) => (props.selected === props.id ? "bold" : "normal")};
  z-index: 1;

  span {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:first-of-type {
    flex: 1;
  }

  span:last-of-type {
    font-size: ${FontSize.TINY};
  }

  &:hover {
    text-decoration: none;
    border-color: ${Color.BATTLESHIP_GREY};
  }
`;

export const SubProjectItemContainer = styled.div<SubProjectItemContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: calc(100% - 5px);
  background-color: ${Color.WHITE};
  margin: auto;
  border: 1px;
  border-color: ${Color.SILVER};
  border-style: solid;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 100%;
  padding: 10px;
`;

export const SubProjectItem = styled.button<SubProjectComponentButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: calc(100% - 20px);
  width: 100%;
  height: 30px;
  border: 1px;
  border-color: ${(props) => (props.selected === props.id ? Color.DARK_TURQUOISE : Color.JASMINE)};
  border-style: solid;
  border-radius: 5px;
  background-color: ${Color.WHITE};
  font-size: ${FontSize.MEDIUM};
  font-family: ${FontType.STANDARD};
  font-weight: ${(props) => (props.selected === props.id ? "bold" : "normal")};
  z-index: 1;
  cursor: move;

  span {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:first-of-type {
    flex: 1;
  }

  span:last-of-type {
    font-size: ${FontSize.TINY};
  }

  &:hover {
    text-decoration: none;
    border-color: ${Color.PINK};
  }
`;
