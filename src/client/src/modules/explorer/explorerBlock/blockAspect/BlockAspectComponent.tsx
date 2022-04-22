import { Dispatch } from "redux";
import { LockComponent } from "../../shared/components/LockComponent";
import { Node } from "../../../../models";
import { BlockAspectElement } from "./components/BlockAspectElement";
import { OnLockNode } from "../../shared/handlers/OnLockNode";
import { TextResources } from "../../../../assets/text/TextResources";
import { ViewportData } from "../../../../models/project";
import { AspectContainer } from "../../shared/styled/AspectContainer";

interface Props {
  username: string;
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  isNodeLocking: boolean;
  setLockingNode: (node: Node) => void;
  onToggleExpanded: () => void;
  dispatch: Dispatch;
  viewportData: ViewportData;
}

/**
 * The main component for a BlockView Aspect in the ExplorerModule.
 * @param interface
 * @returns a BlockAspectElement.
 */
export const BlockAspectComponent = ({
  username,
  node,
  selectedNode,
  secondaryNode,
  isExpanded,
  indent,
  isLeaf,
  isNodeLocking,
  setLockingNode,
  dispatch,
  onToggleExpanded,
  viewportData,
}: Props) => (
  <AspectContainer node={node}>
    <LockComponent
      isLocked={node.isLocked}
      unlockText={TextResources.UNLOCK_OBJECT}
      lockText={TextResources.LOCK_OBJECT}
      nodeIsLocking={isNodeLocking}
      onToggleLocked={() => OnLockNode(node, username, setLockingNode, dispatch)}
    />
    <BlockAspectElement
      node={node}
      isExpanded={isExpanded}
      isLeaf={isLeaf}
      onToggleExpanded={onToggleExpanded}
      selectedNode={selectedNode}
      secondaryNode={secondaryNode}
      dispatch={dispatch}
      indent={indent}
      viewportData={viewportData}
    />
  </AspectContainer>
);
