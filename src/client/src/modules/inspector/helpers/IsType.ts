/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attribute, Simple, Interface, Connector, Transport, Edge, Node } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";

export const IsNode = (element: any): element is Node => element?.kind === TextResources.KIND_NODE;
export const IsEdge = (element: any): element is Edge => element?.kind === TextResources.KIND_EDGE;
export const IsTransport = (element: any): element is Transport => element?.kind === TextResources.KIND_TRANSPORT;
export const IsInterface = (element: any): element is Interface => element?.kind === TextResources.KIND_INTERFACE;
export const IsConnector = (element: any): element is Connector => element?.kind === TextResources.KIND_CONNECTOR;
export const IsSimple = (element: any): element is Simple => element?.kind === TextResources.KIND_SIMPLE;
export const IsAttribute = (element: any): element is Attribute => element?.kind === TextResources.KIND_ATTRIBUTE;
