import { AspectContainer } from "../../shared/styled/AspectContainer";
import { VisibleComponent } from "../../shared/components/VisibleComponent";
import { LockComponent } from "../../shared/components/LockComponent";
import { Node } from "../../../../models";
import { TreeAspectElement } from "./components/";
import { Dispatch } from "redux";
import { OnLockNode } from "../../shared/handlers/OnLockNode";
import { OnTreeExplorerChange } from "./handlers/OnTreeExplorerChange";
import { TextResources } from "../../../../assets/text/TextResources";
import { memo } from "react";

interface Props {
  username: string;
  node: Node;
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
const TreeAspectComponent = ({
  username,
  node,
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
}: Props) => {
  return (
    <AspectContainer node={node}>
      <VisibleComponent
        hidden={node.hidden}
        isAncestorVisible={isAncestorVisible}
        isVisible={isVisible}
        showText={TextResources.SHOW_OBJECT}
        hideText={TextResources.HIDE_OBJECT}
        onToggleVisible={() => {
          onSetVisibleElement(!isVisible, node.id);
          OnTreeExplorerChange(node, dispatch);
        }}
      />
      <LockComponent
        isLocked={node.isLocked}
        nodeIsLocking={isNodeLocking}
        unlockText={TextResources.UNLOCK_OBJECT}
        lockText={TextResources.LOCK_OBJECT}
        onToggleLocked={() => OnLockNode(node, username, setLockingNode, dispatch)}
      />
      <TreeAspectElement
        node={node}
        isExpanded={isExpanded}
        isLeaf={isLeaf}
        onToggleExpanded={onToggleExpanded}
        indent={indent}
        dispatch={dispatch}
      />
    </AspectContainer>
  );
};

export default memo(TreeAspectComponent);
