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
  CreateLibraryType,
  CREATE_LIBRARY_KIND,
  Attribute,
  ATTRIBUTE_KIND,
} from "../../../models";
import { COMPOSITE_KIND } from "../../../models/classes/Composite";
import { AttributeLikeItem } from "../types";

export const IsNode = (element: any): element is Node => element?.kind === NODE_KIND;

export const IsEdge = (element: any): element is Edge => element?.kind === EDGE_KIND;

export const IsTransport = (element: any): element is Transport => element?.kind === TRANSPORT_KIND;

export const IsInterface = (element: any): element is Interface => element?.kind === INTERFACE_KIND;

export const IsConnector = (element: any): element is Connector => element?.kind === CONNECTOR_KIND;

export const IsComposite = (element: any): element is Composite => element?.kind === COMPOSITE_KIND;

export const IsCreateLibraryType = (element: any): element is CreateLibraryType => element?.kind === CREATE_LIBRARY_KIND;

export const IsAttribute = (element: any): element is Attribute => element?.kind === ATTRIBUTE_KIND;

type AttributeLikeItemKey = "key" | "entity";

export const GetAttributeLikeItemKey = (item: AttributeLikeItem): AttributeLikeItemKey =>
  IsAttribute(item) ? "key" : "entity";
