import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize, FontType, FontWeight } from "../../../../../../../compLibrary/font";

export const ModalListContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 447px;
  min-height: 370px;
  max-height: 400px;
  color: ${Color.BLACK};
  font-family: ${FontType.STANDARD};
  position: relative;

  :before {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  :after {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const ModalListColumnText = styled.span`
  font-size: ${FontSize.STANDARD};
  font-weight: ${FontWeight.NORMAL};
  text-align: right;
`;

export const ModalListElementsContainer = styled.div`
  border-top: 2px solid ${Color.BASTILLE};
  border-bottom: 1px solid ${Color.BLACK};
  min-height: 370px;
  overflow: auto;
`;

export const ModalListElementText = styled.span``;

interface ModalListElementProps {
  selected: boolean;
}

export const ModalListElement = styled.div<ModalListElementProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 2px 10px;

  :nth-child(even) {
    background-color: ${Color.WHITE};
  }

  :nth-child(odd) {
    background-color: ${Color.LAVANDER_WEB_LIST};
  }

  :nth-child(n):hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
  }

  > ${ModalListElementText} {
    text-decoration: ${(props) => props.selected && "underline"};
    font-weight: ${(props) => props.selected && FontWeight.BOLD};
  }
`;
