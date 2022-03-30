import { Node as FlowNode } from "react-flow-renderer";
import { AspectExpandButton } from "../../shared/components/AspectExpandButton";
import { AspectColorType, Node } from "../../../../../models";
import { GetAspectColor, GetAspectIcon, IsAspectNode, UseIndentLevel } from "../../../../../helpers";
import { CheckboxExplorer } from "../../../../../compLibrary/input/checkbox/explorer/CheckboxExplorer";
import { OnBlockChange } from "./handlers/OnBlockChange";
import { IsChecked, IsMiniCheckBox } from "./helpers/";
import { AspectElementWrapper } from "../../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  flowNodes: FlowNode[];
  dispatch: Dispatch;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
}

/**
 * Component for one element in the Explorer module's BlockAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const BlockAspectElement = ({
  node,
  selectedNode,
  secondaryNode,
  flowNodes,
  dispatch,
  isLeaf,
  isExpanded,
  onToggleExpanded,
  indent,
}: Props) => (
  <AspectElementWrapper indent={UseIndentLevel(indent)}>
    <CheckboxExplorer
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={IsChecked(flowNodes, node)}
      isMiniCheckbox={IsMiniCheckBox(node, selectedNode, secondaryNode)}
      isBlockView
      isAspectNode={IsAspectNode(node)}
      onChange={() => OnBlockChange(node, selectedNode, secondaryNode, dispatch)}
      label={node.label}
      icon={GetAspectIcon(node)}
    />
    {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
  </AspectElementWrapper>
);
