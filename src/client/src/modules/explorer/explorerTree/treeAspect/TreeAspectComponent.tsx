import { Node } from "../../../../models";
import { Dispatch } from "redux";
import { TextResources } from "../../../../assets/text/TextResources";
import { Divider } from "../../../../compLibrary/divider";
import { LockComponent } from "../../shared/components/LockComponent";
import { AspectContainer } from "../../shared/styled/AspectContainer";
import { VisibleComponent } from "../../shared/components/VisibleComponent";
import { OnLockNode } from "../../shared/handlers/OnLockNode";
import { TreeAspectElement } from "../../explorerTree/treeAspect/components/TreeAspectElement";
import { OnTreeExplorerChange } from "../../explorerTree/treeAspect/handlers/OnTreeExplorerChange";

interface Props {
  username: string;
  node: Node;
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  isAncestorVisible: boolean;
  isVisible: boolean;
  isNodeLocking: boolean;
  isGlobalLocking: boolean;
  setLockingNode: (node: Node) => void;
  onToggleExpanded: () => void;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
  dispatch: Dispatch;
}

/**
 * The main component for a TreeView Aspect in the ExplorerModule.
 * @param interface
 * @returns a TreeAspectComponent.
 */
export const TreeAspectComponent = ({
  username,
  node,
  isExpanded,
  indent,
  isLeaf,
  isAncestorVisible,
  isVisible,
  isNodeLocking,
  isGlobalLocking,
  setLockingNode,
  onSetVisibleElement,
  onToggleExpanded,
  dispatch,
}: Props) => (
  <AspectContainer node={node}>
    <VisibleComponent
      isHidden={node.hidden}
      isAncestorVisible={isAncestorVisible}
      isVisible={isVisible}
      showText={TextResources.SHOW_OBJECT}
      hideText={TextResources.HIDE_OBJECT}
      onToggleVisible={() => {
        onSetVisibleElement(!isVisible, node.id);
        OnTreeExplorerChange(node, dispatch);
      }}
    />
    <Divider variant={"vertical"} />
    <LockComponent
      isLocked={node.isLocked}
      nodeIsLocking={isNodeLocking}
      unlockText={TextResources.UNLOCK_OBJECT}
      lockText={TextResources.LOCK_OBJECT}
      onToggleLocked={() => OnLockNode(node, username, setLockingNode, dispatch)}
      disabled={isGlobalLocking}
    />
    <Divider variant={"vertical"} />
    <TreeAspectElement
      node={node}
      isLeaf={isLeaf}
      isExpanded={isExpanded}
      onToggleExpanded={onToggleExpanded}
      indent={indent}
      dispatch={dispatch}
    />
  </AspectContainer>
);

export default TreeAspectComponent;
