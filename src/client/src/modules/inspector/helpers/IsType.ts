import { CREATE_LIBRARY_KIND } from "../../../models/classes/CreateLibraryType";
import {
  Edge,
  Node,
  Transport,
  Interface,
  Connector,
  Simple,
  CreateLibraryType,
  Attribute,
  EDGE_KIND,
  NODE_KIND,
  TRANSPORT_KIND,
  INTERFACE_KIND,
  CONNECTOR_KIND,
  SIMPLE_KIND,
  ATTRIBUTE_KIND,
} from "../../../models";

export const IsNode = (element: any): element is Node => element?.kind === NODE_KIND;

export const IsEdge = (element: any): element is Edge => element?.kind === EDGE_KIND;

export const IsTransport = (element: any): element is Transport => element?.kind === TRANSPORT_KIND;

export const IsInterface = (element: any): element is Interface => element?.kind === INTERFACE_KIND;

export const IsConnector = (element: any): element is Connector => element?.kind === CONNECTOR_KIND;

export const IsSimple = (element: any): element is Simple => element?.kind === SIMPLE_KIND;

export const IsCreateLibraryType = (element: any): element is CreateLibraryType => element?.kind === CREATE_LIBRARY_KIND;

export const IsAttribute = (element: any): element is Attribute => element?.kind === ATTRIBUTE_KIND;
