import styled from "styled-components";
import { FontSize } from "../../../../../../../../../assets/font";
import { Color } from "../../../../../../../../../assets/color/Color";

interface TerminalListElementProps {
  selected: boolean;
}

export const TerminalListElement = styled.div<TerminalListElementProps>`
  padding: 5px 10px 5px 60px;
  min-width: 250px;
  font-size: ${FontSize.TINY};
  display: flex;
  background-color: ${(props) => props.color};

  text-decoration: ${(props) => (props.selected ? "underline" : "none")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;
  }

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export interface TerminalTypeListElementProps {
  selected: boolean;
}

export const TerminalTypeListElement = styled.div<TerminalTypeListElementProps>`
  position: relative;
  padding: 5px 10px 5px 20px;
  min-width: 250px;
  font-size: ${FontSize.SMALL};
  display: flex;
  background-color: ${(props) => props.color};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  :before {
    content: "";
    width: 1px;
    height: 10px;
    background: ${Color.WISTFUL};
    border-radius: 1px;
    position: absolute;
    bottom: 3px;
    left: 16.5px;
  }

  :after {
    content: "";
    width: 385px;
    height: 1px;
    background: ${Color.WISTFUL};
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
    background-color: ${Color.LAVANDER_WEB_HOVER};
    cursor: pointer;
    text-decoration: underline;
  }
`;
