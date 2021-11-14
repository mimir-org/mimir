import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectColorType, Node } from "../../../models";
import { IsBlockView, IsAspectNode, GetAspectIcon, GetSelectedNode, GetAspectColor } from "../../../helpers";
import { AspectBox, ExplorerLine } from "./styled";
import { Elements } from "react-flow-renderer";
import { CheckboxExplorer } from "../../../compLibrary/checkbox/explorer";
import { ChangeNodeDisplay, IsMiniCheckbox } from "../helpers";
import { OnBlockChange } from "../handlers";
import { useAppDispatch } from "../../../redux/store";
import { IsChecked } from "../../explorer/helpers";

interface Props {
  node: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  secondaryNode: Node;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({ node, label, expanded, indent, isLeaf, elements, secondaryNode, onElementExpanded }: Props) => {
  const dispatch = useAppDispatch();
  const selectedNode = GetSelectedNode();
  const blockView = IsBlockView();

  return (
    <>
      <AspectBox indent={indent} node={node}>
        {IsAspectNode(node) && <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon"></img>}
        <div className="container">
          <CheckboxExplorer
            label={label}
            color={GetAspectColor(node, AspectColorType.Selected)}
            isChecked={blockView ? IsChecked(elements, node) : !node?.isHidden ?? false}
            isMiniCheckbox={blockView ? IsMiniCheckbox(node, selectedNode, secondaryNode) : false}
            onChange={() => (blockView ? OnBlockChange(node, secondaryNode, dispatch) : ChangeNodeDisplay(node))}
          />
        </div>

        {!isLeaf && (
          <img
            className="expandIcon"
            src={expanded ? ExpandIcon : CollapseIcon}
            alt="expand-icon"
            onClick={() => onElementExpanded(!expanded, node.id)}
          ></img>
        )}
      </AspectBox>
      <ExplorerLine node={node} />
    </>
  );
};

export default AspectComponent;
