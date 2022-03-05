import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize } from "../../../../../../../compLibrary/font";

interface Props {
  isSelected?: boolean;
  radius: number;
  color: string;
}

export const TerminalsCategoryListElement = styled.div<Props>`
  padding: 10px;
  min-width: 250px;
  font-size: ${FontSize.SMALL};
  display: flex;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.GREY_DARK};

  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};

  .icon {
    display: flex;
    margin-left: auto;
  }

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;
  }
  .numCategoryTerminals {
    padding-right: 10px;
  }

  :hover {
    background-color: ${Color.BLUE_LIGHT};
    cursor: pointer;
    text-decoration: underline;
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

TerminalsCategoryListElement.defaultProps = {
  radius: 5,
};
