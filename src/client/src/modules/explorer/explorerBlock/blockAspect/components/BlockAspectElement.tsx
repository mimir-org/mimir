import { AspectExpandButton } from "../../../shared/components/AspectExpandButton";
import { AspectColorType, Node } from "../../../../../models";
import { GetAspectColor } from "../../../../../helpers";
import { CheckboxBlockExplorer } from "../../../../../compLibrary/input/checkbox/explorer/block/CheckboxBlockExplorer";
import { OnBlockExplorerChange } from "./handlers/OnBlockExplorerChange";
import { IsMiniCheckBox } from "./helpers/IsMiniCheckBox";
import { AspectElementWrapper } from "../../../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetAspectIcon, GetIndentLevel } from "../../../shared/helpers/";
import { ViewportData } from "../../../../../models/project";

interface Props {
  node: Node;
  nodes: Node[];
  selectedNode: Node;
  secondaryNode: Node;
  dispatch: Dispatch;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
  viewportData: ViewportData;
}

/**
 * Component for one element in the Explorer module's BlockAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const BlockAspectElement = ({
  node,
  nodes,
  selectedNode,
  secondaryNode,
  dispatch,
  isLeaf,
  isExpanded,
  onToggleExpanded,
  indent,
  viewportData,
}: Props) => (
  <AspectElementWrapper indent={GetIndentLevel(indent)}>
    <CheckboxBlockExplorer
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={node.selected || node.id === secondaryNode?.id}
      isMiniCheckbox={IsMiniCheckBox(node, secondaryNode, selectedNode)}
      isAspectNode={IsAspectNode(node)}
      onChange={() => OnBlockExplorerChange(node, selectedNode, secondaryNode, nodes, viewportData, dispatch)}
      label={node.label}
      icon={GetAspectIcon(node)}
    />
    {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
  </AspectElementWrapper>
);
