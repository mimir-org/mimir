import { CreateId } from "../../helpers";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { IsFamily } from "../../../../helpers/Family";
import { ConnectorType, Edge, Node, Project, RelationType } from "../../../../models";

const GetProjectData = (event: React.DragEvent<HTMLDivElement>, project: Project, subProject: Project): [Node[], Edge[]] => {
  try {
    if (!subProject?.isSubProject) return [[], []];

    let targetNodeId = event.currentTarget?.attributes["data-id"]?.value;
    if (!targetNodeId) targetNodeId = event.currentTarget?.offsetParent?.attributes["data-id"]?.value;
    if (!targetNodeId) return [[], []];

    const targetNode = project.nodes.find((x) => x.id === targetNodeId);
    if (!targetNode) return [[], []];

    const targetnodeConnector = targetNode.connectors.find(
      (x) => x.relationType === RelationType.PartOf && x.type === ConnectorType.Output
    );

    if (!targetnodeConnector) return [[], []];

    // Add data to current project
    // Find the rootnode for current location
    const rootNode = subProject.nodes.find((x) => x.isRoot && IsFamily(x, targetNode));

    // Find the connector that should do a remap
    const rootNodeConnector = rootNode.connectors.find(
      (x) => x.relationType === RelationType.PartOf && x.type === ConnectorType.Output
    );

    // Find if project has any nodes from this project before
    const alreadyIncludedSome =
      project.nodes.filter((node) => subProject.nodes.some((n) => n.id === node.id && IsFamily(node, targetNode)))?.length > 0;

    if (!alreadyIncludedSome) {
      // Find edges that should change parent
      const edges = subProject.edges.filter((x) => x.fromConnectorId === rootNodeConnector.id);

      // Remap edges
      edges.forEach((edge) => {
        edge.id = CreateId();
        edge.fromConnectorId = targetnodeConnector.id;
        edge.fromNodeId = targetNode.id;
        edge.fromConnector = targetnodeConnector;
        edge.fromNode = targetNode;
        edge.masterProjectId = project.id;
      });
    } else {
      // Remove Edges that is connected to root nodes
      subProject.edges = subProject.edges.filter((x) => x.fromConnectorId !== rootNodeConnector.id);
    }

    const nodesToCreate = subProject.nodes.filter(
      (x) => !x.isRoot && IsFamily(x, targetNode) && !project.nodes.find((y) => y.id === x.id)
    );

    const edgesToCreate = subProject.edges.filter(
      (x) => IsFamily(x.fromNode, targetNode) && !IsAspectNode(x.fromNode) && !project.edges.find((y) => y.id === x.id)
    );

    nodesToCreate.forEach((node) => {
      node.positionY = node.positionY + targetNode.positionY;
    });

    return [nodesToCreate, edgesToCreate];
  } catch (error) {
    throw new Error(error);
  }
};

export default GetProjectData;
