import { Edge, Node, NODE_KIND, EDGE_KIND } from "../../../models";
import { InspectorElement } from "../types";

export const IsNode = (element: InspectorElement): element is Node => element?.kind === NODE_KIND;

export const IsEdge = (element: InspectorElement): element is Edge => element?.kind === EDGE_KIND;
