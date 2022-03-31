import { IsPartOf } from "../../../components/flow/helpers";
import { IsBlockView } from "../../../helpers";
import { Project } from "../../../models";

export const MapProperties = (project: Project, oldProject: Project, reMappedIds: { [id: string]: string }) => {
  if (project?.nodes && oldProject?.nodes) {
    project.nodes.forEach((node) => {
      const oldNode = oldProject.nodes.find((x) => x.id === node.id || (reMappedIds[node.id] && x.id === reMappedIds[node.id]));

      if (oldNode) {
        node.hidden = oldNode.hidden;
        node.blockSelected = oldNode.blockSelected;
        node.selected = oldNode.selected;
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
      if (!IsPartOf(edge.fromConnector)) edge.isHidden = true;
    });
  }
};
