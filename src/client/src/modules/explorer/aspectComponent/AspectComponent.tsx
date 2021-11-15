import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { IsBlockView, IsAspectNode, GetAspectIcon, GetSelectedNode, GetAspectColor } from "../../../helpers";
import { AspectBox, ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { AspectColorType, Node, Project } from "../../../models";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { ChangeNodeDisplay, IsMiniCheckbox } from "../helpers";
import { OnBlockChange } from "../handlers";
import { useAppDispatch } from "../../../redux/store";
import { IsChecked } from "../../explorer/helpers";

interface Props {
  node: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  project: Project;
  expanded: boolean;
  elements: Elements<any>;
  secondaryNode: Node;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({
  node,
  label,
  expanded,
  indent,
  isLeaf,
  project,
  elements,
  secondaryNode,
  onElementExpanded,
}: Props) => {
  const dispatch = useAppDispatch();
  const selectedNode = GetSelectedNode();
  const blockView = IsBlockView();
  return (
    <>
      <AspectBox indent={indent} node={node}>
        <div className="container">
          {!IsBlockView() && <VisibleComponent node={node} project={project} />}
          <LockComponent node={node} project={project} />
          {IsAspectNode(node) ? (
            <>
              <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon" /> <span className="label">{label}</span>
            </>
          ) : (
            <CheckboxExplorer
              label={label}
              color={GetAspectColor(node, AspectColorType.Selected)}
              isChecked={blockView ? IsChecked(elements, node) : !node?.isHidden ?? false}
              isMiniCheckbox={blockView ? IsMiniCheckbox(node, selectedNode, secondaryNode) : false}
              onChange={() => (blockView ? OnBlockChange(node, secondaryNode, dispatch) : ChangeNodeDisplay(node))}
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
