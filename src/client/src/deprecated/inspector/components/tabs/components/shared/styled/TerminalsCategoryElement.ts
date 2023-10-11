import styled from "styled-components";
import { Color } from "../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../assets/font";

interface Props {
  isCategoryHeader?: boolean;
  selected?: boolean;
  radius: number;
  index: number;
}

export const TerminalsCategoryElement = styled.div<Props>`
  padding: 10px;
  min-width: 250px;
  font-size: ${FontSize.SMALL};
  display: flex;
  background-color: ${(props) => (props.index % 2 ? Color.LAVANDER_WEB_LIST : undefined)};
  border-bottom: 1px solid ${Color.LIGHT_SILVER};

  text-decoration: ${(props) => (props.selected ? "underline" : "none")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  .icon {
    display: flex;
    margin-left: auto;
  }

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;

    :hover {
      cursor: pointer;
    }
  }

  .terminalsAmount {
    padding-right: 10px;
  }

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    cursor: ${(props) => (props.isCategoryHeader ? "auto" : "pointer")};
    text-decoration: ${(props) => (props.isCategoryHeader ? "none" : "underline")};
  }

  :first-child {
    border-top-left-radius: ${(props) => props.radius} px;
    border-top-right-radius: ${(props) => props.radius}px;
  }

  :last-child {
    border-bottom-left-radius: ${(props) => props.radius}px;
    border-bottom-right-radius: ${(props) => props.radius}px;
    border-bottom: none;
  }
`;

TerminalsCategoryElement.defaultProps = {
  radius: 5,
};
