import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { AspectBox, ElementBox, ExplorerAspectLine } from "./styled";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../models";
import { BlockAspectElement } from ".";
import { SetBlockNodeIndent } from "./helpers";
import { Dispatch } from "redux";

interface Props {
  project: Project;
  username: string;
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  indent: number;
  isLeaf: boolean;
  expanded: boolean;
  elements: Elements<any>;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
  dispatch: Dispatch;
}
export const BlockAspectComponent = ({
  project,
  username,
  node,
  selectedNode,
  secondaryNode,
  expanded,
  indent,
  isLeaf,
  elements,
  dispatch,
  onElementExpanded,
}: Props) => (
  <>
    <AspectBox node={node}>
      <ElementBox indent={SetBlockNodeIndent(node, indent)}>
        <LockComponent node={node} project={project} username={username} dispatch={dispatch} />
        <BlockAspectElement
          node={node}
          selectedNode={selectedNode}
          secondaryNode={secondaryNode}
          elements={elements}
          dispatch={dispatch}
        />
      </ElementBox>
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

export default BlockAspectComponent;
