import styled from "styled-components";

interface Props {
  colorMain: string;
  colorSelected: string;
  selected: boolean;
  hidden: boolean;
}

export const ParentNodeBox = styled.div<Props>`
  display: flex;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  font-size: 11px;
  text-align: center;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.selected ? props.colorSelected : props.colorMain)};
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transition: border 250ms, opacity 250ms;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
  }

  &.selected {
    border-color: ${(props) => props.colorSelected} !important;
  }
`;
