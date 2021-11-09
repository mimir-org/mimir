import { Project, Edge, Node } from "..";
import { ProjectAm } from "../../redux/sagas/project/ConvertProject";
import { ConnectorType, RelationType } from "../Enums";
import { post } from "../../models/webclient";
import { CreateId } from "../../components/flow/helpers";
import { TextResources } from "../../assets/text";
import { IsAspectNode, IsFamily } from "../../helpers";

const readFile = (event: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const file = event.dataTransfer.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const GetFileData = async (event: any, project: Project): Promise<[Node[], Edge[]]> => {
  try {
    let targetNodeId = event.target?.attributes["data-id"]?.value;
    if (!targetNodeId) targetNodeId = event.target?.offsetParent?.attributes["data-id"]?.value;
    if (!targetNodeId) return [[], []];

    const targetNode = project.nodes.find((x) => x.id === targetNodeId);
    if (!targetNode) return [[], []];

    const targetnodeConnector = targetNode.connectors.find(
      (x) => x.relationType === RelationType.PartOf && x.type === ConnectorType.Output
    );

    if (!targetnodeConnector) return [[], []];

    let data = await readFile(event);
    const loadedProject = JSON.parse(data as string) as ProjectAm;

    if (!loadedProject.isSubProject) return [[], []];

    const url = process.env.REACT_APP_API_BASE_URL + "project/import/";
    const response = await post(url, loadedProject);

    if (response.status !== 200) {
      throw Error(TextResources.Error_SaveUpdateProject);
    }

    const subProject = response.data as Project;
    if (!subProject) throw Error(TextResources.Error_SaveUpdateProject);

    // Add data to current project
    // Find the rootnode for current location
    const rootNode = subProject.nodes.find((x) => x.isRoot && IsFamily(x, targetNode));

    // Find the connector that should do a remap
    const rootNodeConnector = rootNode.connectors.find(
      (x) => x.relationType === RelationType.PartOf && x.type === ConnectorType.Output
    );

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
    throw Error(TextResources.Error_GetFileData);
  }
};

export default GetFileData;
