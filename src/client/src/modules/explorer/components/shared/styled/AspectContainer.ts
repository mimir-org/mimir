import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors/Color";
import { FontSize } from "../../../../../compLibrary/font";
import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType, Node } from "../../../../../models";

interface Props {
  node: Node;
}

export const AspectContainer = styled.div<Props>`
  display: flex;
  height: 30px;
  font-size: ${FontSize.STANDARD};
  margin-top: ${(props) => props.node.isRoot && "15px"};
  background-color: ${(props) =>
    props.node.isRoot ? Color.GREY_LIGHTER : GetAspectColor(props.node, AspectColorType.Main, true)};
  border-bottom: ${(props) => props.node.isRoot && "2px solid" + GetAspectColor(props.node, AspectColorType.Selected)}};

  &:hover {
    background-color: ${Color.BLUE_LIGHT};
  }

  &:first-child {
    margin-top: 5px;
  }
`;
