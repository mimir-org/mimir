import { AspectContainer } from "../../shared/styled/AspectContainer";
import { VisibleComponent } from "../../shared/components/VisibleComponent";
import { LockComponent } from "../../shared/components/LockComponent";
import { Node, Project } from "../../../../models";
import { TreeAspectElement } from "./components/TreeAspectElement";
import { Dispatch } from "redux";
import { OnLockNode } from "../../shared/handlers/OnLockNode";
import { OnTreeExplorerChange } from "./handlers/OnTreeExplorerChange";
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
  onSetVisibleElement,
  onToggleExpanded,
  dispatch,
}: Props) => {
  return (
    <AspectContainer node={node}>
      <VisibleComponent
        isHidden={node.isHidden}
        isAncestorVisible={isAncestorVisible}
        isVisible={isVisible}
        showText={TextResources.EXPLORER_SHOW_OBJECT}
        hideText={TextResources.EXPLORER_HIDE_OBJECT}
        onToggleVisible={() => {
          onSetVisibleElement(!isVisible, node.id);
          OnTreeExplorerChange(node, project, dispatch);
        }}
      />
      <LockComponent
        isLocked={node.isLocked}
        unlockText={TextResources.EXPLORER_UNLOCK_OBJECT}
        lockText={TextResources.EXPLORER_LOCK_OBJECT}
        onToggleLocked={() => OnLockNode(node, project, username, dispatch)}
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
};

export default TreeAspectComponent;
