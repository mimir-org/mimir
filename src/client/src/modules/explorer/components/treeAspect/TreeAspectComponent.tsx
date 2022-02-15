import { AspectContainer } from "../shared/styled/AspectContainer";
import { VisibleComponent } from "../shared/components/VisibleComponent";
import { LockComponent } from "../shared/components/LockComponent";
import { Node, Project } from "../../../../models";
import { TreeAspectElement } from "./TreeAspectElement";
import { Dispatch } from "redux";
import { GetWidth } from "../shared/helpers/GetWidth";
import { OnLockNode } from "../shared/handlers/OnLockNode";
import { OnTreeChange } from "./handlers/OnTreeChange";
import { TextResources } from "../../../../assets/text";

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
}: Props) => (
  <AspectContainer width={GetWidth(nodes)} node={node}>
    <VisibleComponent
      isHidden={node.isHidden}
      isAncestorVisible={isAncestorVisible}
      isVisible={isVisible}
      showText={TextResources.Explorer_Show_Object}
      hideText={TextResources.Explorer_Hide_Object}
      onToggleVisible={() => {
        onSetVisibleElement(!isVisible, node.id);
        OnTreeChange(node, project, dispatch);
      }}
    />
    <LockComponent
      isLocked={node.isLocked}
      unlockText={TextResources.Explorer_Unlock_Object}
      lockText={TextResources.Explorer_Lock_Object}
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

export default TreeAspectComponent;
