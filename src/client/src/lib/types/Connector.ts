import { MimirNode } from "../classes/MimirNode";
import { MimirEdge } from "../classes/MimirEdge";
import { ConnectorCm } from "./FutureTypes";
import { Action, Dispatch } from "redux";
import {
  ConnectorFulfilledBy,
  ConnectorHasLocation,
  ConnectorPartOf,
  ConnectorRelation,
  ConnectorTerminal,
} from "../classes/MimirConnector";

export type InspectorElement = MimirNode | MimirEdge;

export type InspectorAttributesElement = MimirNode | ConnectorCm;

export type ConnectorLikeItem =
  | ConnectorFulfilledBy
  | ConnectorHasLocation
  | ConnectorPartOf
  | ConnectorRelation
  | ConnectorTerminal;

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
