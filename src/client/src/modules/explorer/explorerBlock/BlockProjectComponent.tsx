import * as selectors from "./helpers/selectors";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { BlockAspectComponent } from "./blockAspect/BlockAspectComponent";
import { useEffect, useState } from "react";
import { SortNodesWithIndent } from "../shared/helpers/SortNodesWithIndent";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
import { useReactFlow } from "react-flow-renderer";
import { ViewportData } from "../../../models/project";
import { MimirNode } from "../../../lib/types/MimirNode";
import {MimirProject} from "../../../lib/types/MimirProject";

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
  const project = new MimirProject(projectState?.project);
  const nodes = project?.nodes.map((node) => new MimirNode(node));
  const selectedBlockNode = nodes?.find((n) => n.blockSelected);

  useEffect(() => {
    if (lockingNode != null && !projectState.isLocking) setLockingNode(null);
  }, [lockingNode, projectState.isLocking]);

  if (!project || !nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (node.isAncestorInSet(node, closedNodes, project?.edges)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <BlockAspectComponent
            key={node.id}
            username={username}
            node={node}
            nodes={nodes}
            selectedBlockNode={selectedBlockNode}
            indent={indent}
            isExpanded={expanded}
            isLeaf={!node.hasChildren(project.edges)}
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
