import { Node, Edge, Interface, Transport, Composite, Connector } from "../../models";
export type InspectorElement = Node | Edge;

export type InspectorTerminalsElement = Node | Transport | Interface;

export type InspectorParametersElement = Node | Transport | Interface | Connector | Composite;
