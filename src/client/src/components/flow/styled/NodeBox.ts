import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { IsProduct } from "../../../helpers";
import { Node } from "../../../models";

interface Props {
  node: Node;
  colorMain: string;
  colorSelected: string;
  isSelected: boolean;
}

const NodeBox = styled.div<Props>`
  position: relative;
  opacity: ${(props) => (!props.node.isHidden ? 1 : 0)};
  height: ${(props) => props.node.height}px;
  width: ${(props) => props.node.width}px;
  max-height: inherit;
  border-radius: 10px;
  font-size: 11px;
  text-align: center;
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.isSelected ? props.colorSelected : props.colorMain)};
  box-shadow: ${(props) => !props.isSelected && "0 5px 5px -2px rgba(0, 0, 0, 0.2)"};
  transition: border 250ms ease-in-out, box-shadow 250ms ease-in-out, height 250ms ease-in-out, width 250ms ease-in-out,
    opacity 250ms;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
    box-shadow: none;
  }

  .line {
    height: 1px;
    width: auto;
    background-color: ${(props) => (IsProduct(props.node) ? Color.ProductSelected : Color.FunctionSelected)};
    position: relative;
    bottom: 15px;
    left: 0px;
  }
`;

export default NodeBox;
