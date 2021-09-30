import styled from "styled-components";
import { Color, FontSize } from "../../../../../../compLibrary";

export const TerminalListElement = styled.div`
  padding: 5px 10px 5px 90px;
  min-width: 250px;
  font-size: ${FontSize.Medium};
  display: flex;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.DarkGrey};

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
