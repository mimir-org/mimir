import { Block } from "lib";
import styled from "styled-components";
import { Color } from "../../../../assets/color/Color";
import { FontSize } from "../../../../assets/font";

interface Props {
  node: Block;
}

export const AspectContainer = styled.div<Props>`
  display: flex;
  height: 30px;
  font-size: ${FontSize.STANDARD};
  margin-top: ${(props) => props.node.libraryType == null && "15px"};
  background-color: ${(props) => (props.node.libraryType == null ? Color.GHOST_WHITE : props.node.aspectColor.mainColor)};
  border-bottom: ${(props) => props.node.libraryType == null && "2px solid" + props.node.aspectColor.selectedColor}};

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
  }

  &:first-child {
    margin-top: 5px;
  }
`;
