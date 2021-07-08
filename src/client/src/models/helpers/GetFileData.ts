import { Project } from "..";
import { EdgeAm, NodeAm, ProjectAm } from "../../redux/sagas/project/ConvertProject";
import { ConnectorType, RelationType } from "../Enums";

const readFile = (event: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const file = event.dataTransfer.files[0];
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;
        reader.readAsText(file);
    })
}

const GetFileData = async (event: any, project: Project): Promise<[NodeAm[], EdgeAm[]]> => {
    try {
        let targetNodeId = event.target?.attributes["data-id"]?.value;

        if (!targetNodeId) {
            targetNodeId = event.target?.offsetParent?.attributes["data-id"]?.value;
        }

        if (!targetNodeId)
            return [[], []];

        const targetNode = project.nodes.find((x) => x.id === targetNodeId);
        if (!targetNode)
            return [[], []];

        const targetnodeConnector = targetNode.connectors.find(
            (x) =>
                x.relationType === RelationType.PartOf &&
                x.type === ConnectorType.Output
        );

        if (!targetnodeConnector)
            return [[], []];



        let data = await readFile(event);
        const loadedProject = JSON.parse(data as string) as ProjectAm;
        // console.log(loadedProject);

        // const rootNode = loadedProject.nodes.find(
        //     (x) => x.type === targetNodeType
        // );

        // const rootNodeConnector = rootNode.connectors.find(
        //     (x) =>
        //         x.relationType === RelationType.PartOf &&
        //         x.type === ConnectorType.Output
        // );


        // const edges = loadedProject.edges.filter(
        //     (x) => x.fromConnector === rootNodeConnector.id
        // );

        // edges.forEach((edge) => {
        //     edge.fromConnector = targetnodeConnector.id;
        //     edge.fromNode = targetNode.id;
        //     edge.parentType = targetNode.type;
        // });

        // const nodesToCreate = loadedProject.nodes.filter(
        //     (x) => x.type === targetNode.type
        // );
        // const edgesToCreate = loadedProject.edges.filter(
        //     (x) => x.parentType === targetNode.type
        // );

        // nodesToCreate.forEach(node => {
        //     node.positionY = node.positionY + targetNode.positionY
        // });

        // return [nodesToCreate, edgesToCreate];
        return [[], []];
    } catch (error) {
        throw new Error("Could not create nodes and edges from file.");
    }
};

export default GetFileData;