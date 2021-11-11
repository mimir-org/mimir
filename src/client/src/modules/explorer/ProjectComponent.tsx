import { Node } from "../../models";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { HasChildren, IsAncestorInSet } from "./helpers/ParentNode";
import { useState } from "react";
import { SortNodesWithIndent } from "./helpers/SortNodesWithIndent";
import { IsOffPage } from "../../helpers";
import { blockElementsSelector, projectSelector, secondaryNodeSelector, useAppSelector } from "../../redux/store";

const ProjectComponent = () => {
  const [closedNodes, setClosedNodes] = useState(new Set<string>());
  const elements = useAppSelector(blockElementsSelector);
  const project = useAppSelector(projectSelector);
  const nodes = project?.nodes?.filter((n) => !IsOffPage(n));
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;

  const onExpandElement = (_expanded: boolean, nodeId: string) => {
    _expanded ? closedNodes.delete(nodeId) : closedNodes.add(nodeId);
    setClosedNodes((_) => new Set(closedNodes));
  };

  const areAncestorsExpanded = (elem: Node): boolean => !IsAncestorInSet(elem, closedNodes, project);

  return (
    <>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if (!areAncestorsExpanded(node)) return null;
        return (
          <AspectComponent
            key={node.id}
            node={node}
            label={node.label}
            indent={indent}
            expanded={!closedNodes.has(node.id)}
            isLeaf={!HasChildren(node, project)}
            project={project}
            elements={elements}
            secondaryNode={secondaryNode}
            onElementExpanded={onExpandElement}
          />
        );
      })}
    </>
  );
};

export default ProjectComponent;
