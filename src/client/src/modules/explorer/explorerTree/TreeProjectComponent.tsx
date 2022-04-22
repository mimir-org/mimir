import { Node } from "../../../models";
import { TreeAspectComponent } from "./treeAspect/TreeAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../helpers/ParentNode";
import { useState } from "react";
import { InitialSortNodes } from "../shared/helpers/SortNodesWithIndent";
import { projectSelector, usernameSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { ProjectContentContainer } from "../shared/styled/ProjectComponent.styled";
import { IsOffPage } from "../../../helpers/Aspects";
import { OnExpandExplorerElement } from "../shared/handlers/OnExpandExplorerElement";
import { OnSetVisibleElement } from "./handlers/OnSetVisibleElement";

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module of TreeView.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
export const TreeProjectComponent = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const username = useAppSelector(usernameSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));

  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const [invisibleNodes, setInvisibleNodes] = useState(new Set<string>());

  const ancestorsCollapsed = (elem: Node) => IsAncestorInSet(elem, closedNodes, project);
  const ancestorsVisible = (elem: Node) => !IsAncestorInSet(elem, invisibleNodes, project);
  const isVisible = (elem: Node) => !invisibleNodes.has(elem.id);

  if (!nodes) return null;

  return (
    <ProjectContentContainer>
      {InitialSortNodes(nodes).map((node) => {
        if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);

        return (
          <TreeAspectComponent
            key={node.id}
            username={username}
            node={node}
            nodes={nodes}
            indent={node.level}
            isExpanded={expanded}
            isLeaf={!HasChildren(node.id, project)}
            isAncestorVisible={ancestorsVisible(node)}
            isVisible={isVisible(node)}
            onToggleExpanded={() => OnExpandExplorerElement(!expanded, node.id, closedNodes, setClosedNodes)}
            onSetVisibleElement={() => OnSetVisibleElement(isVisible(node), node.id, invisibleNodes, setInvisibleNodes)}
            dispatch={dispatch}
          />
        );
      })}
    </ProjectContentContainer>
  );
};
