/* eslint-disable @typescript-eslint/no-explicit-any */
import { CREATE_LIBRARY_KIND } from "../../../models/classes/CreateLibraryType";
import {
  ATTRIBUTE_KIND,
  Attribute,
  CONNECTOR_KIND,
  Connector,
  CreateLibraryType,
  EDGE_KIND,
  Edge,
  INTERFACE_KIND,
  Interface,
  NODE_KIND,
  Node,
  SIMPLE_KIND,
  Simple,
  TRANSPORT_KIND,
  Transport,
} from "../../../models";

export const IsNode = (element: any): element is Node => element?.kind === NODE_KIND;

export const IsEdge = (element: any): element is Edge => element?.kind === EDGE_KIND;

export const IsTransport = (element: any): element is Transport => element?.kind === TRANSPORT_KIND;

export const IsInterface = (element: any): element is Interface => element?.kind === INTERFACE_KIND;

export const IsConnector = (element: any): element is Connector => element?.kind === CONNECTOR_KIND;

export const IsSimple = (element: any): element is Simple => element?.kind === SIMPLE_KIND;

export const IsCreateLibraryType = (element: any): element is CreateLibraryType => element?.kind === CREATE_LIBRARY_KIND;

export const IsAttribute = (element: any): element is Attribute => element?.kind === ATTRIBUTE_KIND;
