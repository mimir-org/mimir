import { Node } from "../../../models";
import { TreeAspectComponent } from "./treeAspect/TreeAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../helpers/ParentNode";
import { useEffect, useState } from "react";
import { SortNodesWithIndent } from "../shared/helpers/SortNodesWithIndent";
import { usernameSelector, useAppSelector, projectStateSelector } from "../../../redux/store";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { IsOffPage } from "../../../helpers/Aspects";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
import { OnSetVisibleElement } from "./handlers/OnSetVisibleElement";
import { Dispatch } from "redux";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module of TreeView.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
export const TreeProjectComponent = ({ dispatch }: Props) => {
  const username = useAppSelector(usernameSelector);
  const projectState = useAppSelector(projectStateSelector);
  const project = projectState?.project;
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const edges = project?.edges;

  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const [invisibleNodes, setInvisibleNodes] = useState(new Set<string>());
  const [lockingNode, setLockingNode] = useState(null);

  const ancestorsCollapsed = (elem: Node) => IsAncestorInSet(elem, closedNodes, edges);
  const ancestorsVisible = (elem: Node) => !IsAncestorInSet(elem, invisibleNodes, edges);
  const isVisible = (elem: Node) => !invisibleNodes.has(elem.id);

  useEffect(() => {
    if (lockingNode !== null && !projectState.isLocking) setLockingNode(null);
  }, [lockingNode, projectState.isLocking]);

  if (!nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <TreeAspectComponent
            key={node.id}
            username={username}
            node={node}
            indent={indent}
            isExpanded={expanded}
            isLeaf={!HasChildren(node.id, edges)}
            isAncestorVisible={ancestorsVisible(node)}
            isVisible={isVisible(node)}
            isNodeLocking={lockingNode?.id === node.id && projectState.isLocking}
            isGlobalLocking={projectState.isLocking}
            setLockingNode={setLockingNode}
            onToggleExpanded={() => OnExpandExplorerElement(!expanded, node.id, closedNodes, setClosedNodes)}
            onSetVisibleElement={() => OnSetVisibleElement(true, node.id, invisibleNodes, setInvisibleNodes)}
            dispatch={dispatch}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
