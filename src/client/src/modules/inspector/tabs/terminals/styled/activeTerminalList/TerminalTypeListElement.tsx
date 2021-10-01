import styled from "styled-components";
import { Color, FontSize } from "../../../../../../compLibrary";

export const TerminalTypeListElement = styled.div`
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
    background: ${Color.TerminalsPurple};
    border-radius: 1px;
    position: absolute;
    bottom: 3px;
    left: 16.5px;
  }

  :after {
    content: "";
    width: 385px;
    height: 1px;
    background: ${Color.TerminalsPurple};
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
    background-color: ${Color.LightBlue};
    cursor: pointer;
    text-decoration: underline;
  }
`;
