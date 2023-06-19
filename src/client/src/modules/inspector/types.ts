import { Action, Dispatch } from "redux";
import { AspectObject, Connection, Connector, ConnectorTerminal } from "lib";

/**
 * Union type of possible top elements chosen in inspector, i.e. what can be selected in by the inspector.
 */
export type InspectorElement = AspectObject | Connection;

/**
 * Union type of possible top elements chosen for terminals view in inspector, i.e. what element owns the terminals shown in terminals view.
 * In the case of InspectorElement which is Edge, the edge's transport/interface owns the terminals.
 */
export type InspectorTerminalsElement = AspectObject;

/**
 * Union type of possible top elements chosen for parameters view in inspector, i.e. what element owns the attributes shown in parameters view.
 * This can either be attributes directly on the object itself (Node, Transport, Interface), or on its terminals (via terminals view).
 */
export type InspectorAttributesElement = InspectorTerminalsElement | ConnectorTerminal;
export type TerminalLikeItem = Connector | ConnectorTerminal;

export type ChangeInspectorVisibilityAction = () => Action;
export type ChangeInspectorHeightAction = (height: number) => Action;
export type ChangeInspectorTabAction = (index: number) => Action;
export type OnToogleHandler = (
  dispatch: Dispatch,
  open: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction,
  changeInspectorHeightAction: ChangeInspectorHeightAction
) => void;
