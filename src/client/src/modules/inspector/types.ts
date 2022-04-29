import { Action, Dispatch } from "redux";
import {
  Attribute,
  AttributeType,
  CombinedAttribute,
  Connector,
  ConnectorType,
  CreateLibraryType,
  Edge,
  Interface,
  Node,
  Simple,
  SimpleType,
  TerminalTypeExtended,
  Transport,
} from "../../models";

/**
 * Union type of possible top elements chosen in inspector, i.e. what can be selected in by the inspector.
 */
export type InspectorElement = Node | Edge;

/**
 * Union type of possible top elements chosen for terminals view in inspector, i.e. what element owns the terminals shown in terminals view.
 * In the case of InspectorElement which is Edge, the edge's transport/interface owns the terminals.
 */
export type InspectorTerminalsElement = Node | Transport | Interface | CreateLibraryType;

/**
 * Union type of possible top elements chosen for parameters view in inspector, i.e. what element owns the attributes shown in parameters view.
 * This can either be attributes directly on the object itself (Node, Transport, Interface, Simple), or on its terminals (via terminals view).
 */
export type InspectorParametersElement = InspectorTerminalsElement | TerminalLikeItem | SimpleLikeItem;
export type AttributeLikeItem = Attribute | AttributeType;
export type CombinedAttributeDict = { [name: string]: CombinedAttribute[] };
export type TerminalLikeItem = Connector | TerminalTypeExtended;
export type SimpleLikeItem = Simple | SimpleType;

export type SelectedTerminalIdentifier = {
  id: string;
  connectorType: ConnectorType;
  index: number;
};

export type ChangeInspectorVisibilityAction = (visibility: boolean) => Action;
export type ChangeInspectorHeightAction = (height: number) => Action;
export type ChangeInspectorTabAction = (index: number) => Action;
export type OnToogleHandler = (
  dispatch: Dispatch,
  open: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction,
  changeInspectorHeightAction: ChangeInspectorHeightAction
) => void;
