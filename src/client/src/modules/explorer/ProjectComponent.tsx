import { Project, Node } from "../../models";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode } from "../../components/flow/helpers";
import { HasChildren, IsAncestorInSet } from "./helpers/ParentNode";
import { useState } from "react";
import { SortNodesWithIndent } from "./helpers/SortNodesWithIndent";

interface Props {
  project: Project;
  elements: any[];
  nodes: Node[];
}

export const ProjectComponent = ({ project, elements, nodes }: Props) => {
  const [closedNodes, setClosedNodes] = useState(new Set<string>());

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
            isRoot={IsAspectNode(node)}
            isLeaf={!HasChildren(node, project)}
            project={project}
            elements={elements}
            onElementExpanded={onExpandElement}
          />
        );
      })}
    </>
  );
};

export default ProjectComponent;
