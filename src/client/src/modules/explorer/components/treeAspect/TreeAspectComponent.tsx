import { AspectContainer } from "../shared/styled/AspectContainer";
import { VisibleComponent } from "../shared/components/VisibleComponent";
import { LockComponent } from "../shared/components/LockComponent";
import { Node, Project } from "../../../../models";
import { TreeAspectElement } from "./components/TreeAspectElement";
import { Dispatch } from "redux";
import { OnLockNode } from "../shared/handlers/OnLockNode";
import { OnTreeChange } from "./handlers/OnTreeChange";
import { TextResources } from "../../../../assets/text/TextResources";
interface Props {
  project: Project;
  username: string;
  node: Node;
  nodes: Node[];
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  isAncestorVisible: boolean;
  isVisible: boolean;
  isNodeLocking: boolean;
  setLockingNode: (node: Node) => void;
  onToggleExpanded: () => void;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
  dispatch: Dispatch;
}

/**
 * The main component for a TreeView Aspect in the ExplorerModule.
 * @param interface
 * @returns a TreeAspectElement.
 */
export const TreeAspectComponent = ({
  project,
  username,
  node,
  nodes,
  isExpanded,
  indent,
  isLeaf,
  isAncestorVisible,
  isVisible,
  isNodeLocking,
  setLockingNode,
  onSetVisibleElement,
  onToggleExpanded,
  dispatch,
}: Props) => (
  <AspectContainer node={node}>
    <VisibleComponent
      isHidden={node.isHidden}
      isAncestorVisible={isAncestorVisible}
      isVisible={isVisible}
      showText={TextResources.EXPLORER_SHOW_OBJECT}
      hideText={TextResources.EXPLORER_HIDE_OBJECT}
      onToggleVisible={() => {
        onSetVisibleElement(!isVisible, node.id);
        OnTreeChange(node, project, dispatch);
      }}
    />
    <LockComponent
      isLocked={node.isLocked}
      nodeIsLocking={isNodeLocking}
      unlockText={TextResources.EXPLORER_UNLOCK_OBJECT}
      lockText={TextResources.EXPLORER_LOCK_OBJECT}
      onToggleLocked={() => OnLockNode(node, username, setLockingNode, dispatch)}
    />
    <TreeAspectElement
      node={node}
      nodes={nodes}
      isExpanded={isExpanded}
      isLeaf={isLeaf}
      onToggleExpanded={onToggleExpanded}
      indent={indent}
    />
  </AspectContainer>
);

export default TreeAspectComponent;
