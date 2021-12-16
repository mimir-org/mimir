import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize } from "../../../../compLibrary/font";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Node } from "../../../../models";

interface Props {
  node: Node;
  width: number;
}

const AspectBox = styled.div<Props>`
  display: flex;
  max-height: 30px;
  min-width: min-content;
  max-width: 500px;
  padding-left: 5px;
  background-color: ${(props) =>
    props.node.isRoot ? Color.GreyLighter : GetAspectColor(props.node, AspectColorType.Main, true)};
  margin-top: ${(props) => props.node.isRoot && "15px"};
  font-size: ${FontSize.Standard};
  position: relative;

  &:hover {
    background-color: ${Color.BlueLight};
  }

  &:first-child {
    margin-top: 5px;
  }

  .label {
    padding-left: ${(props) => (props.node.isRoot ? 10 : 15)}px;
  }

  .expand-icon {
    position: ${(props) => (props.node.isRoot ? "absolute" : "relative")};
    top: ${(props) => props.node.isRoot && 42}%;
    left: ${(props) => props.node.isRoot && 54.5}%;
    left: ${(props) => props.node.isRoot && props.width === 500 && 36}%;
    margin-left: ${(props) => !props.node.isRoot && 22}px;
    padding-right: ${(props) => !props.node.isRoot && 18}px;
  }

  .icon {
    position: relative;
    top: 6px;
    left: 6px;
    pointer-events: none;
  }
`;

export default AspectBox;
