import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { Node, Project } from "../../../models";
import { AspectBox } from "../../../compLibrary/box/aspect";
import { CheckboxTree, CheckboxBlock } from "../checkboxComponent";
import { IsBlockView, IsAspectNode, GetAspectIcon } from "../../../helpers";
import { ExplorerAspectLine } from "./styled";
import { VisibleComponent } from "../visibleComponent";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
interface Props {
  node: Node;
  label: string;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  project: Project;
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
}: Props) => (
  <>
    <AspectBox indent={indent} node={node}>
      {IsAspectNode(node) ? (
        <>
          {!IsBlockView() && <VisibleComponent node={node} project={project} />}
          <LockComponent node={node} project={project} />
          <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon" />
          <span className="label">{label}</span>
        </>
      ) : (
        <div className="container">
          {!IsBlockView() && <VisibleComponent node={node} project={project} />}
          <LockComponent node={node} project={project} />
          {!IsBlockView() ? (
            <CheckboxTree node={node} project={project} inputLabel={label} />
          ) : (
            <CheckboxBlock node={node} inputLabel={label} secondaryNode={secondaryNode} elements={elements} />
          )}
        </div>
      )}
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

export default AspectComponent;
