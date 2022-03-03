import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { IsProduct } from "../../../../../../../helpers";
import { Node } from "../../../../../../../models";
import { Size } from "../../../../../../../compLibrary/size";

interface Props {
  node: Node;
  colorMain: string;
  colorSelected: string;
  isSelected: boolean;
}

const NodeBox = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  min-height: ${Size.NODE_HEIGHT}px;
  min-width: ${Size.NODE_WIDTH}px;
  padding: 5px 0;
  opacity: ${(props) => (!props.node.isHidden ? 1 : 0)};
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
    background-color: ${(props) => (IsProduct(props.node) ? Color.PRODUCT_SELECTED : Color.FUNCTION_SELECTED)};
    position: relative;
    bottom: 15px;
    left: 0;
  }
`;

export default NodeBox;
