import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { Node, Project } from "../../../models";
import { AspectBox } from "../../../compLibrary/box/aspect";
import { CheckboxTree, CheckboxBlock } from "../checkboxComponent";
import { IsBlockView, IsAspectNode, GetAspectIcon } from "../../../helpers";
import { ExplorerLine } from "./styled";

interface Props {
  node: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  project: Project;
  secondaryNode: Node;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({ node, label, expanded, indent, isLeaf, project, secondaryNode, onElementExpanded }: Props) => (
  <>
    <AspectBox indent={indent} node={node}>
      {IsAspectNode(node) && <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon"></img>}
      <div className="container">
        {!IsBlockView() ? (
          <CheckboxTree node={node} project={project} inputLabel={label} />
        ) : (
          <CheckboxBlock project={project} node={node} inputLabel={label} secondaryNode={secondaryNode} />
        )}
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

export default AspectComponent;
