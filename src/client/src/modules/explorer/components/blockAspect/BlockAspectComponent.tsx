import { AspectContainer } from "../shared/styled/AspectContainer";
import { LockComponent } from "../shared/components/LockComponent";
import { Elements } from "react-flow-renderer";
import { Node } from "../../../../models";
import { BlockAspectElement } from "./components/BlockAspectElement";
import { Dispatch } from "redux";
import { OnLockNode } from "../shared/handlers/OnLockNode";
import { TextResources } from "../../../../assets/text/TextResources";

interface Props {
  username: string;
  node: Node;
  selectedNode: Node;
  secondaryNode: Node;
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  elements: Elements;
  onToggleExpanded: () => void;
  dispatch: Dispatch;
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
  elements,
  dispatch,
  onToggleExpanded,
}: Props) => (
  <AspectContainer node={node}>
    <LockComponent
      isLocked={node.isLocked}
      unlockText={TextResources.EXPLORER_UNLOCK_OBJECT}
      lockText={TextResources.EXPLORER_LOCK_OBJECT}
      onToggleLocked={() => OnLockNode(node, username, dispatch)}
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
