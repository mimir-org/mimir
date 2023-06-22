import styled from "styled-components";
import { Size } from "assets/size/Size";
import { FontWeight } from "assets/font";
import { SymbolImage } from "compLibrary/symbol/Symbol.styled";

interface Props {
  colorMain: string;
  colorSelected: string;
  selected: boolean;
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

export const TreeLogoWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 4px;
  padding: 0 8px;
`;

export const TreeNodeNameBox = styled.p`
  margin: 0;
  font-weight: ${FontWeight.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;
