import { Node } from "../../../models";
import { useAppDispatch, useAppSelector, usernameSelector, projectSelector, secondaryNodeSelector } from "../../../redux/store";
import { BlockAspectComponent } from "./blockAspect/BlockAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../helpers/ParentNode";
import { useState } from "react";
import { InitialSortNodes } from "../shared/helpers/SortNodesWithIndent";
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
  const project = useAppSelector(projectSelector);
  const username = useAppSelector(usernameSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const selectedNode = nodes?.find((n) => n.selected);
  const secondaryNode = useAppSelector(secondaryNodeSelector);

  const ancestorsCollapsed = (elem: Node) => IsAncestorInSet(elem, closedNodes, project);

  if (!project || !nodes) return null;

  return (
    <ProjectContentContainer>
      {InitialSortNodes(nodes).map((node) => {
        if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <BlockAspectComponent
            key={node.id}
            username={username}
            node={node}
            selectedNode={selectedNode}
            secondaryNode={secondaryNode}
            indent={node.level}
            isExpanded={expanded}
            isLeaf={!HasChildren(node.id, project)}
            onToggleExpanded={() => OnExpandExplorerElement(!expanded, node.id, closedNodes, setClosedNodes)}
            dispatch={dispatch}
            viewportData={viewportData}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
