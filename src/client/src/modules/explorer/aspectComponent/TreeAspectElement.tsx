import { AspectColorType, Node } from "../../../models";
import { GetAspectColor, GetAspectIcon, IsAspectNode, useSelectedNodes, UseSetSelectNodes } from "../../../helpers";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { OnSelectActiveNode } from "../handlers";
import { IsCheckedTree } from "../helpers";
import { AspectHeader } from "./styled";

interface Props {
  node: Node;
  nodes: Node[];
  label: string;
}

/**
 * Component for one element in the the Explorer module's TreeAspectComponent.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
const TreeAspectElement = ({ node, nodes, label }: Props) => {
  const [selectedNodes] = useSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();

  return IsAspectNode(node) ? (
    <AspectHeader>
      <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon" />
      <span className="label">{label}</span>
    </AspectHeader>
  ) : (
    <CheckboxExplorer
      label={label}
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
