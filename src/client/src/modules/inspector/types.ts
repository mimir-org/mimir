import {
  Node,
  Edge,
  Interface,
  Transport,
  Composite,
  Connector,
  CreateLibraryType,
  Attribute,
  AttributeType,
  CombinedAttribute,
} from "../../models";

/**
 * Union type of possible top elements chosen in inspector, i.e. what can be selected in by the inspector.
 */
export type InspectorElement = Node | Edge | CreateLibraryType;

/**
 * Union type of possible top elements chosen for terminals view in inspector, i.e. what element owns the terminals shown in terminals view.
 * In the case of InspectorElement which is Edge, the edge's transport/interface owns the terminals.
 */
export type InspectorTerminalsElement = Node | Transport | Interface | CreateLibraryType;

/**
 * Union type of possible top elements chosen for parameters view in inspector, i.e. what element owns the attributes shown in parameters view.
 * This can either be attributes directly on the object itself (Node, Transport, Interface, Composite), or on it's terminals (via terminals view).
 */
export type InspectorParametersElement = InspectorTerminalsElement | Connector | Composite;

export type AttributeLikeItem = Attribute | AttributeType;

export type CombinedAttributeDict = { [name: string]: CombinedAttribute[] };
