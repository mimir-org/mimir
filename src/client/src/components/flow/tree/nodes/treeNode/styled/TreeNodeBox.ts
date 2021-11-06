import styled from "styled-components";
import { Size } from "../../../../../../compLibrary";

interface Props {
  colorMain: string;
  colorSelected: string;
  isSelected: boolean;
}

const TreeNodeBox = styled.div<Props>`
  border-radius: 10px;
  width: ${Size.Node_Width}px;
  height: ${Size.Node_Length}px;
  font-size: 11px;
  text-align: center;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.isSelected ? props.colorSelected : props.colorMain)};
  transition: border 200ms ease-in-out;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
  }
`;

export default TreeNodeBox;
