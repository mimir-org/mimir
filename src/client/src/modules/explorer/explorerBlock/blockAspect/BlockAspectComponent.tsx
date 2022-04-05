import { Dispatch } from "redux";
import { AspectContainer } from "../../shared/styled/AspectContainer";
import { LockComponent } from "../../shared/components/LockComponent";
import { Node, Project } from "../../../../models";
import { BlockAspectElement } from "./components/BlockAspectElement";
import { OnLockNode } from "../../shared/handlers/OnLockNode";
import { TextResources } from "../../../../assets/text/TextResources";

interface Props {
  project: Project;
  username: string;
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  dispatch: Dispatch;
}

/**
 * The main component for a BlockView Aspect in the ExplorerModule.
 * @param interface
 * @returns a BlockAspectElement.
 */
export const BlockAspectComponent = ({
  project,
  username,
  node,
  selectedNode,
  secondaryNode,
  isExpanded,
  indent,
  isLeaf,
  dispatch,
  onToggleExpanded,
}: Props) => (
  <AspectContainer node={node}>
    <LockComponent
      isLocked={node.isLocked}
      unlockText={TextResources.EXPLORER_UNLOCK_OBJECT}
      lockText={TextResources.EXPLORER_LOCK_OBJECT}
      onToggleLocked={() => OnLockNode(node, project, username, dispatch)}
    />
    <BlockAspectElement
      project={project}
      node={node}
      isExpanded={isExpanded}
      isLeaf={isLeaf}
      onToggleExpanded={onToggleExpanded}
      selectedNode={selectedNode}
      secondaryNode={secondaryNode}
      dispatch={dispatch}
      indent={indent}
    />
  </AspectContainer>
);
