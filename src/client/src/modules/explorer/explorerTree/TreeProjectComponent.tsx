import { TreeAspectComponent } from "./treeAspect/TreeAspectComponent";
import { useEffect, useState } from "react";
import { SortNodesWithIndent } from "../shared/helpers/SortNodesWithIndent";
import { usernameSelector, useAppSelector, projectStateSelector } from "../../../redux/store";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
import { Dispatch } from "redux";
import { MimirNode } from "../../../lib/types/Node";

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
  const nodes = project?.nodes.map((node) => new MimirNode(node));
  const edges = project?.edges;
  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const [lockingNode, setLockingNode] = useState(null);

  useEffect(() => {
    if (lockingNode !== null && !projectState.isLocking) setLockingNode(null);
  }, [lockingNode, projectState.isLocking]);

  if (!nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (node.isAncestorInSet(node, closedNodes, edges)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <TreeAspectComponent
            key={node.id}
            username={username}
            node={node}
            indent={indent}
            isExpanded={expanded}
            isLeaf={node.hasChildren(edges)}
            isNodeLocking={lockingNode?.id === node.id && projectState.isLocking}
            isGlobalLocking={projectState.isLocking}
            setLockingNode={setLockingNode}
            onToggleExpanded={() => OnExpandExplorerElement(!expanded, node.id, closedNodes, setClosedNodes)}
            dispatch={dispatch}
            project={project}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
