import { commonStateSelector, useAppDispatch, useAppSelector, projectStateSelector } from "store";
import { BlockAspectComponent } from "./blockAspect/BlockAspectComponent";
import { useEffect, useState } from "react";
import { SortNodesWithIndent } from "../shared/helpers/SortNodesWithIndent";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
import { useReactFlow } from "react-flow-renderer";
import { ViewportData } from "../../../models/project";
import { CommonState } from "store/reducers/commonReducer";

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
  const projectState = useAppSelector(projectStateSelector);
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const project = projectState?.project;
  const nodes = project?.aspectObjects;
  const selectedBlockNode = nodes?.find((n) => n.blockSelected);

  useEffect(() => {
    if (lockingNode != null && !projectState.isLocking) setLockingNode(null);
  }, [lockingNode, projectState.isLocking]);

  if (!project || !nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        // if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <BlockAspectComponent
            key={node.id}
            username={commonState?.user?.email ?? ""}
            node={node}
            nodes={nodes}
            selectedBlockNode={selectedBlockNode}
            indent={indent}
            isExpanded={expanded}
            isLeaf={!project.hasChildren(node.id)}
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
