import styled from "styled-components";
import { FontSize } from "../../../../../../../../../compLibrary/font";
import { Color } from "../../../../../../../../../compLibrary/colors";

interface TerminalListElementProps {
  isSelected: boolean;
}

export const TerminalListElement = styled.div<TerminalListElementProps>`
  padding: 5px 10px 5px 60px;
  min-width: 250px;
  font-size: ${FontSize.Tiny};
  display: flex;
  background-color: ${(props) => props.color};

  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;
  }

  :hover {
    background-color: ${Color.BLUE_LIGHT};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export interface TerminalTypeListElementProps {
  isSelected: boolean;
}

export const TerminalTypeListElement = styled.div<TerminalTypeListElementProps>`
  position: relative;
  padding: 5px 10px 5px 20px;
  min-width: 250px;
  font-size: ${FontSize.Small};
  display: flex;
  background-color: ${(props) => props.color};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};

  :before {
    content: "";
    width: 1px;
    height: 10px;
    background: ${Color.TERMINALS_PURPLE};
    border-radius: 1px;
    position: absolute;
    bottom: 3px;
    left: 16.5px;
  }

  :after {
    content: "";
    width: 385px;
    height: 1px;
    background: ${Color.TERMINALS_PURPLE};
    border-radius: 1px;
    position: absolute;
    bottom: 3px;
    left: 16.5px;
  }

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;
  }

  .numTypeTerminals {
    padding-right: 10px;
  }

  :hover {
    background-color: ${Color.BLUE_LIGHT};
    cursor: pointer;
    text-decoration: underline;
  }
`;
