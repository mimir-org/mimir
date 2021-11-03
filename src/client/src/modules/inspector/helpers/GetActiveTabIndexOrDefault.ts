import { IsRelationEdge } from "../../../components/flow/helpers/IsRelationEdge";
import { InspectorElement } from "../types";
import { IsEdge } from "./IsType";

export const GetActiveTabIndexOrDefault = (activeTabIndex: number, element: InspectorElement): number => {
  if (IsEdge(element) && IsRelationEdge(element))
    return activeTabIndex > RELATION_EDGE_INSPECTOR_TAB_MAX ? RELATION_EDGE_INSPECTOR_TAB_DEFAULT : activeTabIndex;

  return activeTabIndex;
};

const RELATION_EDGE_INSPECTOR_TAB_MAX = 0;
const RELATION_EDGE_INSPECTOR_TAB_DEFAULT = 0;
