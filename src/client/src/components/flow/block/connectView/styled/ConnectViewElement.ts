import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

/** Styled component that displays an element in the drop-down menu for the ConnectViewMenu. */
const ConnectViewElement = styled.div`
  border-top: 1.3px solid ${Color.DarkGrey};
  padding: 5px 10px 0px 0px;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  height: 20px;
  min-width: 115px;
  position: relative;
  display: flex;

  .text {
    position: relative;
    text-align: left;
    padding-left: 30px;
    bottom: 8px;
  }

  .link {
    position: absolute;
    left: 7px;
    top: -2px;

    &:last-child {
      left: unset;
      right: 8px;
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
