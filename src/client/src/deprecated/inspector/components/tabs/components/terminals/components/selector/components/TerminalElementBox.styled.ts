import styled from "styled-components";
import { FontSize } from "../../../../../../../../../assets/font";
import { Color } from "../../../../../../../../../assets/color/Color";

interface TerminalElementProps {
  selected: boolean;
}

export const TerminalElementBox = styled.div<TerminalElementProps>`
  padding: 5px 10px 5px 25px;
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
