import styled from "styled-components";
import { SymbolImage } from "compLibrary/symbol/Symbol.styled";
import { Color } from "assets/color/Color";
import { Size } from "assets/size/Size";
import { Aspect, AspectObject } from "lib";
import { FontWeight } from "assets/font";

interface NodeBoxProps {
  node: AspectObject;
  colorMain: string;
  colorSelected: string;
  selected: boolean;
}

interface BoxWrapperProps {
  isElectro: boolean;
}

interface HandleContainerProps {
  isElectro: boolean;
}

interface HandleBoxProps {
  hidden: boolean;
  isPartOf: boolean;
  top: string;
  left: string;
}

export const NodeBox = styled.div<NodeBoxProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  min-height: ${Size.NODE_HEIGHT}px;
  min-width: ${Size.NODE_WIDTH}px;
  padding: 5px 0;
  border-radius: 10px;
  font-size: 11px;
  text-align: center;
  background-color: ${(props) => props.colorMain};
  border: 3px solid;
  border-color: ${(props) => (props.selected ? props.colorSelected : props.colorMain)};
  box-shadow: ${(props) => !props.selected && "0 5px 5px -2px rgba(0, 0, 0, 0.2)"};
  transition: border 250ms ease-in-out, box-shadow 250ms ease-in-out, height 250ms ease-in-out, width 250ms ease-in-out,
    opacity 250ms;

  &:hover {
    border-color: ${(props) => props.colorSelected} !important;
    box-shadow: none;
  }

  .line {
    height: 1px;
    width: auto;
    background-color: ${(props) => (props.node.aspect === Aspect.Product ? Color.VIRIDIAN_GREEN : Color.SUNGLOW)};
    position: relative;
    bottom: 15px;
    left: 0;
  }
`;

export const SymbolBox = styled.div`
  max-height: 30px;

  ${SymbolImage} {
    min-height: 30px;
  }
`;

export const LogoBox = styled.div`
  height: 20px;
  width: 50px;
  align-self: flex-start;
  pointer-events: none;
  margin-left: 10px;

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;

export const NodeBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BlockNodeNameBox = styled.p`
  max-width: 130px;
  margin: 0;
  font-weight: ${FontWeight.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BoxWrapper = styled.div<BoxWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.isElectro ? "column" : "row")};
  padding: ${(props) => (props.isElectro ? "0 20px" : "20px 0")};
`;

export const HandleContainer = styled.div<HandleContainerProps>`
  display: flex;
  gap: 4px;
  flex-direction: ${(props) => (props.isElectro ? "row" : "column")};
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;

export const HandleBox = styled.div<HandleBoxProps>`
  position: ${(props) => (props.isPartOf ? "absolute" : "relative")};
  line-height: 0;
  transition: top 0.2s ease-out, left 0.2s ease-out;

  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: revert;

  .react-flow__handle-block {
    visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
    transition: top 0.2s ease-out, left 0.2s ease-out;
  }
`;
