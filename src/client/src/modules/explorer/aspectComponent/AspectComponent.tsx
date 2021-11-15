import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectColorType, Node, Project } from "../../../models";
import { IsBlockView, IsAspectNode, GetAspectIcon, GetAspectColor } from "../../../helpers";
import { AspectBox, ExplorerLine } from "./styled";
import { Elements } from "react-flow-renderer";
import { CheckboxExplorer } from "../../../compLibrary/input/checkbox/explorer";
import { IsMiniCheckbox } from "../helpers";
import { OnBlockChange, OnTreeChange } from "../handlers";
import { useAppDispatch } from "../../../redux/store";
import { IsChecked } from "../../explorer/helpers";

interface Props {
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  project: Project;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({
  node,
  selectedNode,
  secondaryNode,
  project,
  label,
  expanded,
  indent,
  isLeaf,
  elements,
  onElementExpanded,
}: Props) => {
  const dispatch = useAppDispatch();
  const blockView = IsBlockView();
  const isChecked = blockView ? IsChecked(elements, node) : !node?.isHidden;
  const isMiniCheckbox = blockView ? IsMiniCheckbox(node, selectedNode, secondaryNode) : false;

  return (
    <>
      <AspectBox indent={indent} node={node}>
        {IsAspectNode(node) && <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon"></img>}
        <div className="container">
          <CheckboxExplorer
            label={label}
            color={GetAspectColor(node, AspectColorType.Selected)}
            isChecked={isChecked}
            isMiniCheckbox={isMiniCheckbox}
            onChange={() =>
              blockView ? OnBlockChange(node, selectedNode, secondaryNode, dispatch) : OnTreeChange(node, project, dispatch)
            }
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
