import * as selectors from "./helpers/selectors";
import { Node } from "../../../models";
import { BlockAspectComponent } from "./blockAspect/BlockAspectComponent";
import { TreeAspectComponent } from "./treeAspect/TreeAspectComponent";
import { HasChildren, IsAncestorInSet } from "../../../helpers/ParentNode";
import { memo, useState } from "react";
import { SortNodesWithIndent } from "./helpers/SortNodesWithIndent";
import { IsBlockView } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { ProjectContentContainer } from "./ProjectComponent.styled";
import { IsOffPage } from "../../../helpers/Aspects";

/**
 * Component for a single Project in Mimir, displayed in the Explorer Module.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
const ProjectComponent = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const username = useAppSelector(selectors.usernameSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));

  const selectedNode = nodes?.find((n) => n.isSelected);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);

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

  const areAncestorsExpanded = (elem: Node) => !IsAncestorInSet(elem, closedNodes, project);
  const areAncestorsVisible = (elem: Node) => !IsAncestorInSet(elem, invisibleNodes, project);
  const isVisible = (elem: Node) => !invisibleNodes.has(elem.id);

  if (!nodes) return null;

  return (
    <ProjectContentContainer>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (!areAncestorsExpanded(node)) return null;
        const expanded = !closedNodes.has(node.id);
        const expandHandler = () => onExpandElement(!expanded, node.id);

        if (IsBlockView()) {
          return (
            <BlockAspectComponent
              key={node.id}
              project={project}
              username={username}
              node={node}
              selectedNode={selectedNode}
              secondaryNode={secondaryNode}
              indent={indent}
              isExpanded={expanded}
              isLeaf={!HasChildren(node, project)}
              onToggleExpanded={expandHandler}
              dispatch={dispatch}
            />
          );
        }
        return (
          <TreeAspectComponent
            key={node.id}
            project={project}
            username={username}
            node={node}
            nodes={nodes}
            indent={indent}
            isExpanded={expanded}
            isLeaf={!HasChildren(node, project)}
            isAncestorVisible={areAncestorsVisible(node)}
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
export default memo(ProjectComponent);
