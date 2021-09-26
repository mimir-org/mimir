import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

/** Styled component that displays an element in the drop-down menu for the ConnectViewMenu. */
const ConnectViewElement = styled.div`
  border-top: 1.3px solid ${Color.DarkGrey};
  padding: 5px 34px 5px 5px;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  height: 15px;
  width: auto;
  min-width: 150px;
  position: relative;

  .text {
    position: absolute;
    left: 30px;
    bottom: -3px;
  }

  .link {
    position: absolute;
    left: 7px;
    top: -2px;

    &:last-child {
      left: 146px;
    }

    &:hover {
      text-decoration: underline;
      font-weight: bold;
      cursor: pointer;
    }
  }

  &:first-child {
    border-top: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-top: 1.4px solid ${Color.FunctionTab};
  }

  &:hover {
    text-decoration: underline;
    background-color: ${Color.LightBlue};
    cursor: pointer;

    &:last-child {
      background-color: ${Color.White};
      cursor: auto;
    }
  }
`;

export default ConnectViewElement;
