import { AspectExpandButton } from "../../shared/components/AspectExpandButton";
import { AspectColorType, Node } from "../../../../../models";
import { GetAspectColor, GetAspectIcon, GetSelectedNodes, UseIndentLevel } from "../../../../../helpers";
import { CheckboxExplorer } from "../../../../../compLibrary/input/checkbox/explorer/CheckboxExplorer";
import { OnBlockExplorerChange } from "./handlers/OnBlockExplorerChange";
import { IsNodeInBlockExplorerChecked, IsMiniCheckBox } from "./helpers/";
import { AspectElementWrapper } from "../../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/CheckTypes";
import { useReactFlow } from "react-flow-renderer";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
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
  dispatch,
  isLeaf,
  isExpanded,
  onToggleExpanded,
  indent,
}: Props) => {
  const flowNodes = useReactFlow().getNodes();

  return (
    <AspectElementWrapper indent={UseIndentLevel(indent)}>
      <CheckboxExplorer
        color={GetAspectColor(node, AspectColorType.Selected)}
        isChecked={IsNodeInBlockExplorerChecked(flowNodes, node)}
        isMiniCheckbox={IsMiniCheckBox(node, selectedNode, secondaryNode)}
        isAspectNode={IsAspectNode(node)}
        onChange={() => OnBlockExplorerChange(node, selectedNode, secondaryNode, dispatch)}
        label={node.label}
        icon={GetAspectIcon(node)}
        isBlockView
      />
      {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
    </AspectElementWrapper>
  );
};
