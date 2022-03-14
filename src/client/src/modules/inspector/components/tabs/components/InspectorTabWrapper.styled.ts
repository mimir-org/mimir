import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors/Color";
import { FontWeight } from "../../../../../compLibrary/font";

interface InspectorTabHeaderProps {
  active: boolean;
  color: string;
}

export const InspectorTabHeader = styled.div<InspectorTabHeaderProps>`
  pointer-events: initial;
  box-sizing: border-box;
  min-width: 120px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  color: ${Color.BLACK};
  margin-right: 7px;
  height: ${(props) => (props.active ? 44 : 35)}px;
  margin-top: ${(props) => (props.active ? 0 : 9)}px;
  background-color: ${(props) => (props.active ? Color.GREY_LIGHTER : props.color)};
  padding: ${(props) => (props.active ? "17px 5px 0px 5px;" : "8px 5px 0px 5px")};
  box-shadow: -4px 0 4px -5px rgba(0, 0, 0, 0.4), 4px 0 3px -5px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
  }
`;

export const InspectorTabHeaderTitle = styled.p`
  position: relative;
  bottom: ${(props: { active: boolean }) => (props.active ? 20 : 16)}px;
  font-weight: ${(props: { active: boolean }) => props.active && FontWeight.BOLD};
  text-align: center;
`;

export const InspectorTabBody = styled.div`
  top: 44px;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &:hover {
    cursor: default;
  }
`;
