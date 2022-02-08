import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface ToolElementBoxProps {
  active: boolean;
}

export const ToolElementBox = styled.div<ToolElementBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 60px;
  cursor: pointer;

  :hover {
    background-color: ${Color.BlueLight};
  }

  &:first-child {
    background-color: ${(props) => props.active && Color.GreyToolBarSelected};
    border-left: 1px solid ${Color.Grey};
    border-right: 1px solid ${Color.Grey};
  }

  &:nth-child(2) {
    background-color: ${(props) => !props.active && Color.GreyToolBarSelected};
  }

  &:last-child {
    border-left: 1px solid ${Color.Grey};
    background-color: ${(props) => props.active && Color.GreyToolBarSelected};
  }
`;
