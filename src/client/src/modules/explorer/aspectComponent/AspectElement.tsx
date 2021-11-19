import { AspectColorType, Node } from "../../../models";
import { GetAspectColor, GetAspectIcon, IsAspectNode, IsBlockView, useSelectedNodes, UseSetSelectNodes } from "../../../helpers";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { OnBlockChange, OnSelectActiveNode } from "../handlers";
import { IsChecked, IsCheckedTree, IsMiniCheckbox } from "../helpers";
import { Elements } from "react-flow-renderer";
import { AspectHeader } from "./styled";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  nodes: Node[];
  elements: Elements<any>;
  label: string;
  dispatch: any;
}

/**
 * Component for one element in the the Explorer module.
 * @param interface
 * @returns an element with either an Aspect header or a checkbox.
 */
const AspectElement = ({ node, selectedNode, secondaryNode, nodes, elements, label, dispatch }: Props) => {
  const blockView = IsBlockView();
  const [selectedNodes] = useSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();
  const isMiniCheckbox = blockView ? IsMiniCheckbox(node, selectedNode, secondaryNode) : false;
  const isChecked = blockView ? IsChecked(elements, node) : IsCheckedTree(node, selectedNodes);

  return IsAspectNode(node) ? (
    <AspectHeader>
      <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon" />
      <span className="label">{label}</span>
    </AspectHeader>
  ) : (
    <CheckboxExplorer
      label={label}
      color={GetAspectColor(node, AspectColorType.Selected)}
      isChecked={isChecked}
      isMiniCheckbox={isMiniCheckbox}
      onChange={() =>
        blockView
          ? OnBlockChange(node, selectedNode, secondaryNode, dispatch)
          : OnSelectActiveNode(node, nodes, selectedNodes, setActiveNodeElement)
      }
    />
  );
};

export default AspectElement;
