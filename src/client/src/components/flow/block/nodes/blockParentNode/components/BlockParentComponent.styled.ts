import styled from "styled-components";
import { Color } from "../../../../../../assets/color/Color";

interface ParentBoxProps {
  selected: boolean;
  width: number;
  height: number;
}

export const ParentBox = styled.div<ParentBoxProps>`
  position: relative;
  cursor: ${(props) => (props.selected ? "grab" : "pointer")};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
  border: 2px solid;
  border-color: ${Color.LIGHT_SILVER};
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
`;

interface ResizeButtonProps {
  visible: boolean;
}

export const ResizeButton = styled.div<ResizeButtonProps>`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  position: absolute;
  bottom: 0;
  right: 0;
  height: 80px;
  width: 80px;
  pointer-events: all;
  z-index: 1;

  img {
    pointer-events: none;
    position: relative;
    height: 15px;
    top: 58px;
    left: 58px;
  }

  &:hover {
    cursor: all-scroll;
  }
`;
