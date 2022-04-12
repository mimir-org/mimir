import { AspectExpandButton } from "../../../shared/components/AspectExpandButton";
import { AspectColorType, Node } from "../../../../../models";
import { CheckboxExplorer } from "../../../../../compLibrary/input/checkbox/explorer/CheckboxExplorer";
import { OnSelectActiveNode } from "./handlers/OnSelectActiveNode";
import { IsNodeInTreeExplorerChecked } from "./helpers/IsNodeInTreeExplorerChecked";
import { AspectElementWrapper } from "../../../shared/styled/AspectElementWrapper";
import { Icon } from "../../../../../compLibrary/icon";
import { GetAspectColor, UseSetSelectNodes } from "../../../../../helpers";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetSelectedNodes } from "../../../../../helpers/Selected";
import { GetAspectIcon, GetIndentLevel } from "../../../shared/helpers/";

interface Props {
  node: Node;
  nodes: Node[];
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  indent?: number;
}

/**
 * Component for one element in the Explorer module's TreeAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
export const TreeAspectElement = ({ node, nodes, isLeaf, isExpanded, onToggleExpanded, indent }: Props) => {
  const selectedNodes = GetSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();

  return (
    <AspectElementWrapper indent={GetIndentLevel(indent)}>
      {IsAspectNode(node) ? (
        <>
          <Icon size={22} src={GetAspectIcon(node)} alt="" />
          <span>{node.label}</span>
        </>
      ) : (
        <CheckboxExplorer
          color={GetAspectColor(node, AspectColorType.Selected)}
          isChecked={IsNodeInTreeExplorerChecked(node.id, selectedNodes)}
          onChange={() => OnSelectActiveNode(node, nodes, selectedNodes, setActiveNodeElement)}
          label={node.label}
        />
      )}
      {!isLeaf && <AspectExpandButton onClick={onToggleExpanded} isExpanded={isExpanded} />}
    </AspectElementWrapper>
  );
};
