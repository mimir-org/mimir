import styled from "styled-components";
import { Color, FontSize } from "../../../../../../compLibrary";

export const TerminalTypeListElement = styled.div`
  padding: 5px 10px 5px 45px;
  min-width: 250px;
  font-size: ${FontSize.Medium};
  display: flex;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.DarkGrey};

  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;
  }

  .numTypeTerminals {
    padding-right: 10px;
  }

  :hover {
    background-color: ${Color.LightBlue};
    cursor: pointer;
    text-decoration: underline;
  }
`;
