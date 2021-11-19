import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize } from "../../../../compLibrary/font";
import { UseIndentLevel, GetAspectColor } from "../../../../helpers";
import { AspectColorType, Node } from "../../../../models";

interface Props {
  node: Node;
  indent: number;
}

const AspectBox = styled.div<Props>`
  display: flex;
  max-height: 30px;
  padding-left: 5px;
  background-color: ${(props) => (props.node.isRoot ? Color.LightGrey : GetAspectColor(props.node, AspectColorType.Main, true))};
  margin-top: ${(props) => props.node.isRoot && "15px"};
  font-size: ${FontSize.Standard};

  &:hover {
    background-color: ${Color.LightBlue};
  }

  .label {
    padding-bottom: ${(props) => (props.node.isRoot ? 4 : 5)}px;
    padding-left: ${(props) => (props.node.isRoot ? 10 : 10)}px;
  }

  .expand-icon {
    margin-left: ${(props) => (props.node.isRoot ? "auto" : "22px")};
    padding-right: ${(props) => (props.node.isRoot ? 18 : 0)}px;
  }

  .icon {
    position: relative;
    top: -3px;
    left: 6px;
    pointer-events: none;
  }

  .container {
    display: flex;
    input,
    .label {
      margin-left: ${(props) => UseIndentLevel(props.indent)}px;
    }
  }
`;

export default AspectBox;
