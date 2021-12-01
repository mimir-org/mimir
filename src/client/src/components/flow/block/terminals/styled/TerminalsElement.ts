import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize } from "../../../../../compLibrary/font";

const TerminalsElement = styled.div`
  display: flex;
  height: 20px;
  padding: 5px 30px 0px 0px;
  border-bottom: 1px solid;
  border-color: ${Color.GreyDark};
  font-size: ${FontSize.Tiny};
  color: ${Color.Black};
  z-index: 4;

  .terminal-name {
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
    background-color: ${Color.BlueLight};
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
