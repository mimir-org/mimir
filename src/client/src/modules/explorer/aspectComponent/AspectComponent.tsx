import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { Node, Project } from "../../../models";
import { IsAspectNode } from "../../../components/flow/helpers";
import { AspectBox } from "../../../compLibrary/box/aspect";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import { IsBlockView } from "../../../components/flow/block/helpers";
import { GetAspectIcon } from "../../../assets/helpers";
import { ExplorerLine } from "./styled";

interface Props {
  node: Node;
  label: string;
  indent: number;
  project: Project;
  isRoot: boolean;
  isLeaf: boolean;
  expanded: boolean;
  elements: any[];
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}
export const AspectComponent = ({
  node,
  label,
  project,
  expanded,
  indent,
  isLeaf,
  isRoot,
  elements,
  onElementExpanded,
}: Props) => (
  <>
    <AspectBox indent={indent} node={node} isRoot={isRoot}>
      {IsAspectNode(node) && <img src={GetAspectIcon(node)} alt="aspect-icon" className="icon"></img>}
      <div className="container">
        {IsBlockView() ? (
          <CheckboxBlock elements={elements} node={node} inputLabel={label} />
        ) : (
          <Checkbox node={node} project={project} inputLabel={label} />
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
    <ExplorerLine isRoot={node?.isRoot} node={node} />
  </>
);

export default AspectComponent;
