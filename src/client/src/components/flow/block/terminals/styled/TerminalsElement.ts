import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize } from "../../../../../compLibrary/font";

const TerminalsElement = styled.div`
  display: flex;
  height: 20px;
  padding: 5px 2px 0px 0px;
  border-bottom: 1px solid;
  border-color: ${Color.GreyDark};
  font-size: ${FontSize.Tiny};
  color: ${Color.Black};
  z-index: 4;

  .terminal-name {
    height: 17px;
    text-align: left;
    width: 130px;
    padding: 0px 3px 0px 40px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden !important;
    z-index: 5;
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
