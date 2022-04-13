import { useReactFlow } from "react-flow-renderer";
import { AspectExpandButton } from "../../../shared/components/AspectExpandButton";
import { AspectColorType, Node, Project } from "../../../../../models";
import { GetAspectColor } from "../../../../../helpers";
import { CheckboxExplorer } from "../../../../../compLibrary/input/checkbox/explorer/CheckboxExplorer";
import { OnBlockExplorerChange } from "./handlers/OnBlockExplorerChange";
import { IsNodeInBlockExplorerChecked, IsMiniCheckBox } from "./helpers";
import { AspectElementWrapper } from "../../../shared/styled/AspectElementWrapper";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetAspectIcon, GetIndentLevel } from "../../../shared/helpers/";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  project: Project;
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
  project,
  dispatch,
  isLeaf,
  isExpanded,
  onToggleExpanded,
  indent,
}: Props) => {
  const flowNodes = useReactFlow().getNodes();

  return (
    <AspectElementWrapper indent={GetIndentLevel(indent)}>
      <CheckboxExplorer
        color={GetAspectColor(node, AspectColorType.Selected)}
        isChecked={IsNodeInBlockExplorerChecked(flowNodes, node)}
        isMiniCheckbox={IsMiniCheckBox(node?.id, secondaryNode?.id, selectedNode)}
        isAspectNode={IsAspectNode(node)}
        onChange={() => OnBlockExplorerChange(node, selectedNode, secondaryNode, project, dispatch)}
        label={node.label}
        icon={GetAspectIcon(node)}
        isBlockView
      />
      {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
    </AspectElementWrapper>
  );
};
