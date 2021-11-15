import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { UseIndentLevel, GetAspectColor } from "../../../../helpers";
import { AspectColorType, Node } from "../../../../models";

interface Props {
  node: Node;
  indent: number;
}

const AspectBox = styled.div<Props>`
  display: flex;
  cursor: pointer;
  max-height: 30px;
  padding-left: 5px;
  background-color: ${(props) => (props.node.isRoot ? Color.LightGrey : GetAspectColor(props.node, AspectColorType.Main, true))};
  margin-top: ${(props) => props.node.isRoot && "7px"};

  &:hover {
    background-color: ${Color.LightBlue};
  }

  .label {
    padding: 5px 0px 7px 16px;
  }

  .expand-icon {
    margin-left: ${(props) => (props.node.isRoot ? "auto" : "26px")};
    padding-right: ${(props) => (props.node.isRoot ? 18 : 0)}px;
  }

  .icon {
    position: relative;
    top: -1px;
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
