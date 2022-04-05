import styled from "styled-components";
import { Size } from "../../../../../compLibrary/size/Size";

interface Props {
  colorMain: string;
  colorSelected: string;
  isSelected: boolean;
  visible: boolean;
}

export const TreeNodeBox = styled.div<Props>`
  border-radius: 10px;
  width: ${Size.NODE_WIDTH}px;
  height: ${Size.NODE_HEIGHT}px;
  font-size: 11px;
  text-align: center;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.isSelected ? props.colorSelected : props.colorMain)};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: border 250ms, opacity 250ms;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
  }

  &.selected {
    border-color: ${(props) => props.colorSelected} !important;
  }
`;
