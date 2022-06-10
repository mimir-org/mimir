/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attribute, Simple, Interface, Connector, Transport, Edge, Node } from "@mimirorg/modelbuilder-types";

export const IsNode = (element: any): element is Node => element?.kind === "Node";
export const IsEdge = (element: any): element is Edge => element?.kind === "Edge";
export const IsTransport = (element: any): element is Transport => element?.kind === "Transport";
export const IsInterface = (element: any): element is Interface => element?.kind === "Interface";
export const IsConnector = (element: any): element is Connector => element?.kind === "Connector";
export const IsSimple = (element: any): element is Simple => element?.kind === "Simple";
export const IsAttribute = (element: any): element is Attribute => element?.kind === "Attribute";
