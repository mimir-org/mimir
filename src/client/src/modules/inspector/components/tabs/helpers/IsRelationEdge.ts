import { Edge } from "../../../../../models";

export const IsRelationEdge = (edge: Edge) => !!edge.fromConnector?.relationType;
