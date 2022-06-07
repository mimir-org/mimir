import styled from "styled-components";
import { Color } from "../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../assets/font";

interface Props {
  selected?: boolean;
  radius: number;
  color: string;
}

export const TerminalsCategoryListElement = styled.div<Props>`
  padding: 10px;
  min-width: 250px;
  font-size: ${FontSize.SMALL};
  display: flex;
  background-color: ${(props) => props.color};
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
  }
  .numCategoryTerminals {
    padding-right: 10px;
  }

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
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
