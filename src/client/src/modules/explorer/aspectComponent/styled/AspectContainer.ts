import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize } from "../../../../compLibrary/font";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Node } from "../../../../models";

interface Props {
  node: Node;
  width: number;
}

const AspectContainer = styled.div<Props>`
  display: flex;
  height: 30px;
  min-width: min-content;
  max-width: 500px;
  font-size: ${FontSize.Standard};
  position: relative;
  margin-top: ${(props) => props.node.isRoot && "15px"};
  background-color: ${(props) =>
    props.node.isRoot ? Color.GreyLighter : GetAspectColor(props.node, AspectColorType.Main, true)};
  border-bottom: ${(props) => props.node.isRoot && "2px solid" + GetAspectColor(props.node, AspectColorType.Selected)}};

  &:hover {
    background-color: ${Color.BlueLight};
  }

  &:first-child {
    margin-top: 5px;
  }
`;

export default AspectContainer;
