import * as selectors from "./helpers/selectors";
import { Node } from "../../models";
import { TreeAspectComponent, BlockAspectComponent } from "./aspectComponent/";
import { HasChildren, IsAncestorInSet } from "./helpers/ParentNode";
import { useState } from "react";
import { SortNodesWithIndent } from "./helpers/SortNodesWithIndent";
import { GetSelectedNode, IsBlockView, IsOffPage } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/store";

/**
 * Component for a singe Project in Mimir, displayed in the Explorer Module.
 * @returns drop-down menus with checkboxes for each Aspect.
 */
const ProjectComponent = () => {
  const dispatch = useAppDispatch();
  const elements = useAppSelector(selectors.blockElementsSelector);
  const project = useAppSelector(selectors.projectSelector);
  const username = useAppSelector(selectors.usernameSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const selectedNode = GetSelectedNode();
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

  const areAncestorsExpanded = (elem: Node): boolean => !IsAncestorInSet(elem, closedNodes, project);
  const areAncestorsVisible = (elem: Node): boolean => !IsAncestorInSet(elem, invisibleNodes, project);
  const isVisible = (elem: Node): boolean => !invisibleNodes.has(elem.id);

  if (!project || !nodes) return null;

  return (
    <>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (!areAncestorsExpanded(node)) return null;
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
              expanded={!closedNodes.has(node.id)}
              isLeaf={!HasChildren(node, project)}
              elements={elements}
              onElementExpanded={onExpandElement}
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
            expanded={!closedNodes.has(node.id)}
            isLeaf={!HasChildren(node, project)}
            isAncestorVisible={areAncestorsVisible(node)}
            isVisible={isVisible(node)}
            onElementExpanded={onExpandElement}
            onSetVisibleElement={onSetVisibleElement}
            dispatch={dispatch}
          />
        );
      })}
    </>
  );
};

export default ProjectComponent;
