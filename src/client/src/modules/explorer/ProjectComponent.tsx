import { Node } from "../../models";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { HasChildren, IsAncestorInSet } from "./helpers/ParentNode";
import { useState } from "react";
import { SortNodesWithIndent } from "./helpers/SortNodesWithIndent";
import { GetSelectedNode, IsOffPage } from "../../helpers";
import { blockElementsSelector, projectSelector, secondaryNodeSelector, useAppSelector } from "../../redux/store";

const ProjectComponent = () => {
  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const [invisibleNodes, setInvisibleNodes] = useState(new Set<string>());
  const elements = useAppSelector(blockElementsSelector);
  const project = useAppSelector(projectSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const selectedNode = GetSelectedNode();
  const secondaryNode = useAppSelector(secondaryNodeSelector);

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
        return (
          <AspectComponent
            key={node.id}
            selectedNode={selectedNode}
            secondaryNode={secondaryNode}
            node={node}
            nodes={nodes}
            label={node.label}
            indent={indent}
            expanded={!closedNodes.has(node.id)}
            isLeaf={!HasChildren(node, project)}
            elements={elements}
            isAncestorVisible={areAncestorsVisible(node)}
            isVisible={isVisible(node)}
            onElementExpanded={onExpandElement}
            onSetVisibleElement={onSetVisibleElement}
          />
        );
      })}
    </>
  );
};

export default ProjectComponent;
