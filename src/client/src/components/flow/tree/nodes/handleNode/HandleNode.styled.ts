import styled from "styled-components";

interface Props {
  colorMain: string;
  colorSelected: string;
  selected: boolean;
  visible: boolean;
}

export const HandleNodeBox = styled.div<Props>`
  border-radius: 10px;
  width: 20px;
  height: 20px;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.selected ? props.colorSelected : props.colorMain)};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: border 250ms, opacity 250ms;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
  }

  &.selected {
    border-color: ${(props) => props.colorSelected} !important;
  }
`;
