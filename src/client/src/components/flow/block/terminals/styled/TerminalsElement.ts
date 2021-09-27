import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

/** Styled component that displays an element in the drop-down menu for the TerminalsMenu. */
const TerminalsElement = styled.div`
  border-bottom: 1px solid;
  border-color: ${Color.DarkGrey};
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  padding: 5px 30px 0px 0px;
  height: 20px;
  display: flex;

  .text {
    padding-left: 28px;
    text-align: left;
    position: relative;
    bottom: 10px;
  }

  :last-child {
    border-bottom: none;
  }

  &:hover {
    text-decoration: underline;
    background-color: ${Color.LightBlue};
    cursor: pointer;

    :first-child {
      border-top-right-radius: 4px;
    }

    :last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
`;

export default TerminalsElement;
