import { AspectColorType, Node } from "../../../models";
import { GetAspectColor, GetAspectIcon, IsAspectNode, useSelectedNodes, UseSetSelectNodes } from "../../../helpers";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { OnSelectActiveNode } from "../handlers";
import { IsCheckedTree } from "../helpers";
import { AspectHeader } from "./styled";

interface Props {
  node: Node;
  nodes: Node[];
}

/**
 * Component for one element in the the Explorer module's TreeAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
const TreeAspectElement = ({ node, nodes }: Props) => {
  const [selectedNodes] = useSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();

  return IsAspectNode(node) ? (
    <AspectHeader>
      <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon" />
      <span className="label">{node.label}</span>
    </AspectHeader>
  ) : (
    <CheckboxExplorer
      label={node.label}
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={IsCheckedTree(node, selectedNodes)}
      isMiniCheckbox={false}
      isBlockView={false}
      isAspectNode={IsAspectNode(node)}
      onChange={() => OnSelectActiveNode(node, nodes, selectedNodes, setActiveNodeElement)}
    />
  );
};

export default TreeAspectElement;
