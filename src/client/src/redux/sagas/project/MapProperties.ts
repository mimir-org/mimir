import { IsPartOfTerminal } from "../../../components/flow/helpers/Connectors";
import { IsBlockView } from "../../../helpers";
import { Edge, Node, Project } from "../../../models";

export const MapProjectProperties = (project: Project, oldProject: Project, reMappedIds: { [id: string]: string }) => {
  if (project?.nodes && oldProject?.nodes) MapNodes(project.nodes, oldProject.nodes, reMappedIds);
  if (project?.edges && oldProject?.edges) MapEdges(project.edges, oldProject.edges, reMappedIds);
};

function MapNodes(nodes: Node[], oldNodes: Node[], reMappedIds: { [id: string]: string }) {
  nodes.forEach((node) => {
    const oldNode = oldNodes.find((n) => n.id === node.id || (reMappedIds[node.id] && n.id === reMappedIds[node.id]));
    if (!oldNode) return;

    node.hidden = oldNode.hidden;
    node.blockSelected = oldNode.blockSelected;
    node.selected = oldNode.selected;
  });
}

function MapEdges(edges: Edge[], oldEdges: Edge[], reMappedIds: { [id: string]: string }) {
  edges.forEach((edge) => {
    const oldEdge = oldEdges.find((e) => e.id === edge.id || (reMappedIds[edge.id] && e.id === reMappedIds[edge.id]));
    if (!oldEdge) return;

    edge.hidden = oldEdge.hidden;
    edge.selected = oldEdge.selected;
  });

  if (!IsBlockView()) {
    edges.forEach((edge) => {
      if (!IsPartOfTerminal(edge.fromConnector)) edge.hidden = true;
    });
  }
}
