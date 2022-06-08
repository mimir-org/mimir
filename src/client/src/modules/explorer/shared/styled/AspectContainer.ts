import styled from "styled-components";
import { Color } from "../../../../assets/color/Color";
import { FontSize } from "../../../../assets/font";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType } from "../../../../models";
import { Node } from "@mimirorg/modelbuilder-types";

interface Props {
  node: Node;
}

export const AspectContainer = styled.div<Props>`
  display: flex;
  height: 30px;
  font-size: ${FontSize.STANDARD};
  margin-top: ${(props) => props.node.isRoot && "15px"};
  background-color: ${(props) =>
    props.node.isRoot ? Color.GHOST_WHITE : GetAspectColor(props.node, AspectColorType.Main, true)};
  border-bottom: ${(props) => props.node.isRoot && "2px solid" + GetAspectColor(props.node, AspectColorType.Selected)}};

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
  }

  &:first-child {
    margin-top: 5px;
  }
`;
