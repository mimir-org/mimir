import { AspectContainer } from "./styled";
import { LockComponent } from "../lockComponent";
import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../models";
import { BlockAspectElement } from ".";
import { Dispatch } from "redux";
import { GetWidth } from "../helpers";
import { OnLockNode } from "../handlers";
import { TextResources } from "../../../assets/text";

interface Props {
  project: Project;
  username: string;
  node: Node;
  nodes: Node[];
  selectedNode: Node;
  secondaryNode: Node;
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  elements: Elements;
  onToggleExpanded: () => void;
  dispatch: Dispatch;
}
export const BlockAspectComponent = ({
  project,
  username,
  node,
  nodes,
  selectedNode,
  secondaryNode,
  isExpanded,
  indent,
  isLeaf,
  elements,
  dispatch,
  onToggleExpanded,
}: Props) => (
  <AspectContainer width={GetWidth(nodes)} node={node}>
    <LockComponent
      isLocked={node.isLocked}
      unlockText={TextResources.Explorer_Unlock_Object}
      lockText={TextResources.Explorer_Lock_Object}
      onToggleLocked={() => OnLockNode(node, project, username, dispatch)}
    />
    <BlockAspectElement
      node={node}
      isExpanded={isExpanded}
      isLeaf={isLeaf}
      onToggleExpanded={onToggleExpanded}
      selectedNode={selectedNode}
      secondaryNode={secondaryNode}
      elements={elements}
      dispatch={dispatch}
      indent={indent}
    />
  </AspectContainer>
);

export default BlockAspectComponent;
