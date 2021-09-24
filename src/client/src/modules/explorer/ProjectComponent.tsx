import { Project, Node } from "../../models";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode, IsProduct } from "../../components/flow/helpers/common";
import { IsBlockView } from "../../components/flow/helpers/block";
import { HasChildren, IsAncestorInSet } from "./helpers/ParentNode";
import { useState } from "react";
import { SortNodesWithIndent } from "./helpers/SortNodesWithIndent";

interface Props {
  project: Project;
  nodes: Node[];
}

export const ProjectComponent = ({ project, nodes }: Props) => {
  const [closedNodes, setClosedNodes] = useState(new Set<string>());

  const onExpandElement = (_expanded: boolean, nodeId: string) => {
    _expanded ? closedNodes.delete(nodeId) : closedNodes.add(nodeId);
    setClosedNodes((_) => new Set(closedNodes));
  };

  const areAncestorsExpanded = (elem: Node): boolean =>
    !IsAncestorInSet(elem, closedNodes);

  return (
    <>
      {SortNodesWithIndent(nodes).map(([node, indent]) => {
        if ((IsBlockView() && IsProduct(node)) || !areAncestorsExpanded(node))
          return null;
        return (
          <AspectComponent
            key={node.id}
            node={node}
            label={node.label}
            indent={indent}
            expanded={!closedNodes.has(node.id)}
            isRoot={IsAspectNode(node)}
            isLeaf={!HasChildren(node)}
            project={project}
            onElementExpanded={onExpandElement}
          />
        );
      })}
    </>
  );
};

export default ProjectComponent;
