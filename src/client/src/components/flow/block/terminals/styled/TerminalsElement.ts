import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize } from "../../../../../compLibrary/font";

/** Styled component that displays an element in the drop-down menu for the TerminalsMenu. */
const TerminalsElement = styled.div`
  border-bottom: 1px solid;
  border-color: ${Color.DarkGrey};
  padding: 5px 34px 5px 5px;
  font-size: ${FontSize.Tiny};
  color: ${Color.Black};
  padding: 5px 30px 0px 0px;
  height: 20px;
  display: flex;
  z-index: 4;

  .text {
    margin-left: 40px;
    height: 16px;
    text-align: left;
    width: 100%;
    padding-top: 2px;
  }

  :last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${Color.LightBlue};
    cursor: pointer;

    :first-child {
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    }

    :last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
`;

export default TerminalsElement;
