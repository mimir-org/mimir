import { EnumBase } from "../enums/EnumBase";
import { RelationType } from "../enums/RelationType";
import { ConnectorType } from "../enums/ConnectorType";
import { ConnectorVisibility } from "../enums/ConnectorVisibility";
import { Attribute } from "./Attribute";

export const CONNECTOR_KIND = "Connector";

export interface Connector {
  id: string;
  iri: string;
  domain: string;
  name: string;
  type: ConnectorType;
  semanticReference: string;
  nodeId: string;
  nodeIri: string;
  connectorVisibility: ConnectorVisibility;
  isRequired: boolean;

  // Terminal
  color: string;
  terminalCategoryId: string;
  terminalCategory: EnumBase;
  attributes: Attribute[];
  terminalTypeId: string;

  // Relation
  relationType: RelationType;

  kind: string;
}
