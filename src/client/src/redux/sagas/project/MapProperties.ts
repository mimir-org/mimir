import { IsPartOfTerminal } from "../../../components/flow/helpers/CheckConnectorTypes";
import { IsBlockView } from "../../../helpers";
import { Project } from "../../../models";

export const MapProperties = (project: Project, oldProject: Project, reMappedIds: { [id: string]: string }) => {
  if (project?.nodes && oldProject?.nodes) {
    project.nodes.forEach((node) => {
      const oldNode = oldProject.nodes.find((x) => x.id === node.id || (reMappedIds[node.id] && x.id === reMappedIds[node.id]));

      if (oldNode) {
        node.isHidden = oldNode.isHidden;
        node.isBlockSelected = oldNode.isBlockSelected;
        node.isSelected = oldNode.isSelected;
      }
    });
  }

  if (project?.edges && oldProject?.edges) {
    project.edges.forEach((edge) => {
      const oldEdge = oldProject.edges.find((x) => x.id === edge.id || (reMappedIds[edge.id] && x.id === reMappedIds[edge.id]));

      if (oldEdge) {
        edge.isHidden = oldEdge.isHidden;
        edge.isSelected = oldEdge.isSelected;
      }
    });
  }

  if (!IsBlockView()) {
    project?.edges.forEach((edge) => {
      if (!IsPartOfTerminal(edge.fromConnector)) edge.isHidden = true;
    });
  }
};
