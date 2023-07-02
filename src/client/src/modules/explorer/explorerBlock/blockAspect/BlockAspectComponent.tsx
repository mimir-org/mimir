import { Dispatch } from "redux";
import { LockComponent } from "../../shared/components/LockComponent";
import { BlockAspectElement } from "./components/BlockAspectElement";
import { TextResources } from "../../../../assets/text/TextResources";
import { ViewportData } from "../../../../models/project";
import { AspectContainer } from "../../shared/styled/AspectContainer";
import { Divider } from "../../../../compLibrary/divider";
import { OnBlockExplorerChange } from "./components/handlers/OnBlockExplorerChange";
import { AspectObject } from "lib";

interface Props {
  username: string;
  node: AspectObject;
  nodes: AspectObject[];
  selectedBlockNode: AspectObject;
  indent: number;
  isLeaf: boolean;
  isExpanded: boolean;
  isNodeLocking: boolean;
  isGlobalLocking: boolean;
  setLockingNode: (node: AspectObject) => void;
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
  nodes,
  selectedBlockNode,
  isExpanded,
  indent,
  isLeaf,
  isNodeLocking,
  isGlobalLocking,
  setLockingNode,
  dispatch,
  onToggleExpanded,
  viewportData,
}: Props) => {
  return (
    <AspectContainer node={node}>
      <LockComponent
        isLocked={node.isLocked}
        unlockText={TextResources.UNLOCK_OBJECT}
        lockText={TextResources.LOCK_OBJECT}
        nodeIsLocking={isNodeLocking}
        onToggleLocked={() => null}
        disabled={isGlobalLocking}
      />
      <Divider variant={"vertical"} />
      <BlockAspectElement
        node={node}
        nodes={nodes}
        isExpanded={isExpanded}
        isLeaf={isLeaf}
        onToggleExpanded={onToggleExpanded}
        selectedBlockNode={selectedBlockNode}
        dispatch={dispatch}
        indent={indent}
        viewportData={viewportData}
        onChange={() => OnBlockExplorerChange(node, nodes, dispatch)}
      />
    </AspectContainer>
  );
};
