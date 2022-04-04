import * as selectors from "./helpers/selectors";
import { Node } from "../../../../models";
import { TreeAspectComponent } from "./treeAspect/TreeAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../../helpers/ParentNode";
import { memo, useState } from "react";
import { InitialSortNodes } from "../../shared/helpers/SortNodesWithIndent";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ProjectContentContainer } from "../../shared/styled/ProjectComponent.styled";
import { IsOffPage } from "../../../../helpers/Aspects";

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module of TreeView.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
const TreeProjectComponent = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const username = useAppSelector(selectors.usernameSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));

  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const [invisibleNodes, setInvisibleNodes] = useState(new Set<string>());

  const onExpandElement = (_expanded: boolean, nodeId: string) => {
    _expanded ? closedNodes.delete(nodeId) : closedNodes.add(nodeId);
    setClosedNodes((_) => new Set(closedNodes));
  };

  const onSetVisibleElement = (_visible: boolean, nodeId: string) => {
    _visible ? invisibleNodes.delete(nodeId) : invisibleNodes.add(nodeId);
    setInvisibleNodes((_) => new Set(invisibleNodes));
  };

  const ancestorsCollapsed = (elem: Node) => IsAncestorInSet(elem, closedNodes, project);
  const ancestorsVisible = (elem: Node) => !IsAncestorInSet(elem, invisibleNodes, project);
  const isVisible = (elem: Node) => !invisibleNodes.has(elem.id);

  if (!nodes) return null;

  return (
    <ProjectContentContainer>
      {InitialSortNodes(nodes).map((node) => {
        if (ancestorsCollapsed(node)) return null;
        const expanded = !closedNodes.has(node.id);
        const expandHandler = () => onExpandElement(!expanded, node.id);

        return (
          <TreeAspectComponent
            key={node.id}
            project={project}
            username={username}
            node={node}
            nodes={nodes}
            indent={node.level}
            isExpanded={expanded}
            isLeaf={!HasChildren(node, project)}
            isAncestorVisible={ancestorsVisible(node)}
            isVisible={isVisible(node)}
            onToggleExpanded={expandHandler}
            onSetVisibleElement={onSetVisibleElement}
            dispatch={dispatch}
          />
        );
      })}
    </ProjectContentContainer>
  );
};

export default memo(TreeProjectComponent);
