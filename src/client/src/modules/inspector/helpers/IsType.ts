import {
  Edge,
  Node,
  NODE_KIND,
  EDGE_KIND,
  Transport,
  Interface,
  Connector,
  TRANSPORT_KIND,
  INTERFACE_KIND,
  CONNECTOR_KIND,
  Composite,
} from "../../../models";
import { COMPOSITE_KIND } from "../../../models/classes/Composite";

export const IsNode = (element: any): element is Node => element?.kind === NODE_KIND;

export const IsEdge = (element: any): element is Edge => element?.kind === EDGE_KIND;

export const IsTransport = (element: any): element is Transport => element?.kind === TRANSPORT_KIND;

export const IsInterface = (element: any): element is Interface => element?.kind === INTERFACE_KIND;

export const IsConnector = (element: any): element is Connector => element?.kind === CONNECTOR_KIND;

export const IsComposite = (element: any): element is Composite => element?.kind === COMPOSITE_KIND;
