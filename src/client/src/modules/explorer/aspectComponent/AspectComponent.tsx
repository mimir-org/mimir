import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import {
  IsBlockView,
  IsAspectNode,
  GetAspectIcon,
  GetSelectedNode,
  GetAspectColor,
  UseSetSelectNodes,
  useSelectedNodes,
} from "../../../helpers";
import { AspectBox, ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { AspectColorType, Node } from "../../../models";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { IsCheckedTree, IsMiniCheckbox } from "../helpers";
import { OnBlockChange, OnSelectActiveNode } from "../handlers";
import { useAppDispatch } from "../../../redux/store";
import { IsChecked } from "../../explorer/helpers";

interface Props {
  node: Node;
  nodes: Node[];
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  secondaryNode: Node;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({
  node,
  nodes,
  label,
  expanded,
  indent,
  isLeaf,
  elements,
  secondaryNode,
  onElementExpanded,
}: Props) => {
  const dispatch = useAppDispatch();
  const selectedNode = GetSelectedNode();
  const blockView = IsBlockView();
  const [selectedNodes] = useSelectedNodes();
  const [setActiveNodeElement] = UseSetSelectNodes();

  return (
    <>
      <AspectBox indent={indent} node={node}>
        <div className="container">
          {!IsBlockView() && <VisibleComponent node={node} />}
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
              isMiniCheckbox={blockView ? IsMiniCheckbox(node, selectedNode, secondaryNode) : false}
              onChange={() =>
                blockView
                  ? OnBlockChange(node, secondaryNode, dispatch)
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
        {/* {selectedNodes && console.log(selectedNodes)} */}
      </AspectBox>
      <ExplorerAspectLine node={node} />
    </>
  );
};

export default AspectComponent;
