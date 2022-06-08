/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attribute, Simple, Interface, Connector, Transport } from "@mimirorg/modelbuilder-types";
import { EDGE_KIND, NODE_KIND, Edge, Node } from "../../../models";

export const IsNode = (element: any): element is Node => element?.kind === NODE_KIND;
export const IsEdge = (element: any): element is Edge => element?.kind === EDGE_KIND;
export const IsTransport = (element: any): element is Transport => element?.kind === "Transport";
export const IsInterface = (element: any): element is Interface => element?.kind === "Interface";
export const IsConnector = (element: any): element is Connector => element?.kind === "Connector";
export const IsSimple = (element: any): element is Simple => element?.kind === "Simple";
export const IsAttribute = (element: any): element is Attribute => element?.kind === "Attribute";
