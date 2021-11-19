import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectBox, ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { AspectColorType, Node, Project } from "../../../models";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { IsCheckedTree, IsMiniCheckbox } from "../helpers";
import { OnBlockChange, OnSelectActiveNode } from "../handlers";
import { useAppDispatch } from "../../../redux/store";
import { IsChecked } from "../../explorer/helpers";
import { IsBlockView, IsAspectNode, GetAspectIcon, GetAspectColor, UseSetSelectNodes, useSelectedNodes } from "../../../helpers";

interface Props {
  node: Node;
  nodes: Node[];
  selectedNode: Node;
  secondaryNode: Node;
  project: Project;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  isAncestorVisible: boolean;
  isVisible: boolean;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
}
export const AspectComponent = ({
  node,
  nodes,
  selectedNode,
  secondaryNode,
  project,
  label,
  expanded,
  indent,
  isLeaf,
  elements,
  isAncestorVisible,
  isVisible,
  onSetVisibleElement,
  onElementExpanded,
}: Props) => {
  const dispatch = useAppDispatch();
  const blockView = IsBlockView();
  const [selectedNodes] = useSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();
  const isMiniCheckbox = blockView ? IsMiniCheckbox(node, selectedNode, secondaryNode) : false;

  return (
    <>
      <AspectBox indent={indent} node={node}>
        <div className="container">
          {!IsBlockView() && (
            <VisibleComponent
              node={node}
              isAncestorVisible={isAncestorVisible}
              isVisible={isVisible}
              onSetVisibleElement={onSetVisibleElement}
            />
          )}
          <LockComponent node={node} />
          {IsAspectNode(node) ? (
            <>
              <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon" /> <span className="label">{label}</span>
            </>
          ) : (
            <CheckboxExplorer
              label={label}
              color={GetAspectColor(node, AspectColorType.Selected)}
              isChecked={blockView ? IsChecked(elements, node) : IsCheckedTree(node, selectedNodes) ?? false}
              isMiniCheckbox={isMiniCheckbox}
              onChange={() =>
                blockView
                  ? OnBlockChange(node, selectedNode, secondaryNode, dispatch)
                  : OnSelectActiveNode(node, nodes, selectedNodes, setActiveNodeElement)
              }
            />
          )}
        </div>
        {!isLeaf && (
          <img
            className="expand-icon"
            src={expanded ? ExpandIcon : CollapseIcon}
            alt="expand-icon"
            onClick={() => onElementExpanded(!expanded, node.id)}
          ></img>
        )}
      </AspectBox>
      <ExplorerAspectLine node={node} />
    </>
  );
};

export default AspectComponent;
