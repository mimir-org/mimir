import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

interface Props {
  color?: string;
}

/** Styled component that displays an element in the drop-down menu for the ConnectViewMenu. */
const ConnectViewElement = styled.div<Props>`
  border-top: 1.3px solid ${Color.DarkGrey};
  padding: 5px 10px 0px 0px;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  height: 20px;
  min-width: 115px;
  position: relative;
  display: flex;

  .text {
    text-align: left;
    margin-left: 30px;
    width: 100%;
    height: 15px;
  }

  .select {
    position: relative;
    margin-left: 10px;
    top: 2px;
    width: 100%;

    &:hover {
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
    border-top: 1.4px solid;
    border-color: ${(props) => props.color};
  }

  &:hover {
    background-color: ${Color.LightBlue};
    cursor: pointer;

    &:last-child {
      background-color: ${Color.White};
      cursor: auto;
    }
  }
`;

export default ConnectViewElement;
