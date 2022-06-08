import { Edge } from "@mimirorg/modelbuilder-types";

export const IsRelationEdge = (edge: Edge) => !!edge.fromConnector?.relationType;
