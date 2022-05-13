import * as selectors from "./helpers/selectors";
import { Node } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { BlockAspectComponent } from "./blockAspect/BlockAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../helpers/ParentNode";
import { useEffect, useState } from "react";
import { SortNodesWithIndent } from "../shared/helpers/SortNodesWithIndent";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { IsOffPage } from "../../../helpers/Aspects";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
import { useReactFlow } from "react-flow-renderer";
import { ViewportData } from "../../../models/project";

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module of BlockView.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
export const BlockProjectComponent = () => {
  const dispatch = useAppDispatch();
  const { setViewport, setCenter } = useReactFlow();
  const viewportData = { setViewport, setCenter } as ViewportData;
  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const [lockingNode, setLockingNode] = useState(null);
  const projectState = useAppSelector(selectors.projectStateSelector);
  const username = useAppSelector(selectors.usernameSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const project = projectState?.project;
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const selectedNode = nodes?.find((n) => n.selected);

  const ancestorsCollapsed = (elem: Node) => IsAncestorInSet(elem, closedNodes, project?.edges);

  useEffect(() => {
    if (lockingNode !== null && !projectState.isLocking) setLockingNode(null);
  }, [lockingNode, projectState.isLocking]);

  if (!project || !nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <BlockAspectComponent
            key={node.id}
            username={username}
            node={node}
            nodes={nodes}
            selectedNode={selectedNode}
            secondaryNode={secondaryNode}
            indent={indent}
            isExpanded={expanded}
            isLeaf={!HasChildren(node.id, project.edges)}
            isNodeLocking={lockingNode?.id === node.id && projectState.isLocking}
            isGlobalLocking={projectState.isLocking}
            setLockingNode={setLockingNode}
            onToggleExpanded={() => OnExpandExplorerElement(!expanded, node.id, closedNodes, setClosedNodes)}
            dispatch={dispatch}
            viewportData={viewportData}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
