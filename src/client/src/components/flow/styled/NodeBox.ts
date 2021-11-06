import styled from "styled-components";
import { Color } from "../../../compLibrary";

interface Props {
  product: boolean;
  width: number;
  length: number;
  colorMain: string;
  colorSelected: string;
  isSelected: boolean;
}

const NodeBox = styled.div<Props>`
  position: relative;
  height: ${(props) => props.length}px;
  width: ${(props) => props.width}px;
  max-height: inherit;
  border-radius: 10px;
  font-size: 11px;
  text-align: center;
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.isSelected ? props.colorSelected : props.colorMain)};
  box-shadow: ${(props) => (!props.isSelected ? "0 5px 5px -2px rgba(0, 0, 0, 0.2)" : "none")};
  transition: border 200ms ease-in-out, box-shadow 200ms ease-in-out;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
    box-shadow: none;
  }

  .line {
    height: 1px;
    width: auto;
    background-color: ${(props) => (props.product ? Color.ProductSelected : Color.FunctionSelected)};
    position: relative;
    bottom: 15px;
    left: 0px;
  }

  .symbolImg {
    pointer-events: none;
  }
`;

export default NodeBox;
