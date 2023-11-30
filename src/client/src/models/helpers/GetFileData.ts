/* eslint-disable @typescript-eslint/no-explicit-any */
import Config from "../../lib/Config";
import { TextResources } from "../../assets/text/TextResources";
import { IsFamily } from "../../helpers/Family";
import { Block, Connection, ConnectorPartOf, ConnectorDirection, Project } from "lib";

const readFile = (event: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const GetFileData = async (event: any, project: Project): Promise<[Block[], Connection[]]> => {
  try {
    return [[], []];
    // let targetNodeId = event.target?.attributes["data-id"]?.value;
    // if (!targetNodeId) targetNodeId = event.target?.offsetParent?.attributes["data-id"]?.value;
    // if (!targetNodeId) return [[], []];

    // const targetNode = project.aspectObjects.find((x) => x.id === targetNodeId);
    // if (!targetNode) return [[], []];

    // const targetnodeConnector = targetNode.connectors.find((c) => c instanceof ConnectorPartOf && c.direction === Direction.Output);

    // if (!targetnodeConnector) return [[], []];

    // const data = await readFile(event);
    // const loadedProject = JSON.parse(data as string) as ProjectAm;

    // if (!loadedProject.isSubProject) return [[], []];

    // const url = Config.API_BASE_URL + "project/import/";
    // const response = await post(url, loadedProject);

    // if (response.status !== 200) throw Error(TextResources.ERROR_SAVE_UPDATE_PROJECT);

    // const subProject = response.data as Project;
    // if (!subProject) throw Error(TextResources.ERROR_SAVE_UPDATE_PROJECT);

    // // Add data to current project
    // // Find the rootnode for current location
    // const rootNode = subProject.aspectObjects.find((x) => x.libraryType === null && IsFamily(x, targetNode));

    // // Find the connector that should do a remap
    // const rootNodeConnector = rootNode.connectors.find((c) => IsPartOfRelation(c) && IsOutputConnector(c));

    // // Find edges that should change parent
    // const edges = subProject.connections.filter((e) => e.fromConnectorId === rootNodeConnector.id);

    // // Remap edges
    // edges.forEach((edge) => {
    //   edge.id = CreateId();
    //   edge.fromConnectorId = targetnodeConnector.id;
    //   edge.fromNodeId = targetNode.id;
    //   edge.fromConnector = targetnodeConnector;
    //   edge.fromNode = targetNode;
    //   edge.masterProjectId = project.id;
    // });

    // const nodesToCreate = subProject.aspectObjects.filter(
    //   (n) => !(n.nodeType === NodeType.Root) && IsFamily(n, targetNode) && !project.nodes.find((y) => y.id === n.id)
    // );

    // const edgesToCreate = subProject.connections.filter(
    //   (e) => IsFamily(e.fromNode, targetNode) && !IsAspectNode(e.fromNode) && !project.edges.find((y) => y.id === e.id)
    // );

    // nodesToCreate.forEach((node) => {
    //   node.positionY = node.positionY + targetNode.positionY;
    // });

    // return [nodesToCreate, edgesToCreate];
  } catch (error) {
    throw Error(TextResources.ERROR_GETFILEDATA);
  }
};
