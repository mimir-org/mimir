import styled from "styled-components";
import { Color, FontSize } from "../../../../../../compLibrary";

interface Props {
  isSelected: boolean;
}

export const TerminalListElement = styled.div<Props>`
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
    background-color: ${Color.LightBlue};
    cursor: pointer;
    text-decoration: underline;
  }
`;
