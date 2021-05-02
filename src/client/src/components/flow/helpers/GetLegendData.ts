import { Node, RELATION_TYPE, RelationType, Project, NODE_TYPE } from "../../../models/project";
import { GetTransportTypeColor, Legend } from ".";
import GetRelationshipColor from "./GetRelationshipColor";

const GetLegendData = (project: Project, isBlockView: boolean, nodeId: string) => {
    if (!project)
        return [] as Legend[];

    let nodes = [];

    if (isBlockView) {
        const fromNode = project.nodes.find((x) => x.id === nodeId);

        project.edges.forEach((edge) => {
            if (edge.fromNode === nodeId) {
                const currentConnector = fromNode.connectors.find(x => x.id === edge.fromConnector);
                if (currentConnector && currentConnector.relationType === RELATION_TYPE.PartOf) {
                    const toNode = project.nodes.find((x) => x.id === edge.toNode);
                    if (!toNode.isHidden)
                        nodes.push(toNode);
                }
            }
        });

    } else {
        nodes = project.nodes.filter(x => !x.isHidden);
    }

    nodes = nodes as Node[];
    // const connectors = [];
    const legends = [] as Legend[];

    nodes.forEach(node => {
        node.connectors.forEach(connector => {
            if (isBlockView && connector.relationType === RELATION_TYPE.Transport as RelationType) {
                const legend = {
                    name: connector.name,
                    color: GetTransportTypeColor(connector.terminalType),
                    nodeType: node.type
                } as Legend;

                if (!legends.some(x => x.color === legend.color || x.nodeType === legend.nodeType))
                    legends.push(legend);
            }
            if (!isBlockView && (connector.relationType === RELATION_TYPE.PartOf as RelationType || connector.relationType === RELATION_TYPE.Relation as RelationType)) {
                const legend = {
                    name: connector.name,
                    color: GetRelationshipColor(connector.terminalType),
                    nodeType: node.type
                } as Legend;

                if (!legends.some(x => x.color === legend.color || x.nodeType === legend.nodeType))
                    legends.push(legend);
            }
        });
    });

    return legends;
};

export default GetLegendData;
