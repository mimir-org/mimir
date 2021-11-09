import { FlowElement } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary";
import { Project } from "../../../models";
import { MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { changeInspectorTab } from "../../../modules/inspector/redux/tabs/actions";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { setActiveNode, setActiveEdge, setActiveBlockNode } from "../../../redux/store/project/actions";

export const handleNoSelect = (project: Project, inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) => {
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  if (project) {
    dispatch(setActiveNode(null, false));
    dispatch(setActiveEdge(null, false));
  }

  dispatch(changeInspectorHeight(Size.ModuleClosed));
  SetPanelHeight(inspectorRef, Size.ModuleClosed); // TODO: remove
};

export const handleNodeSelect = (
  element: FlowElement,
  inspectorOpen: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  dispatch(setActiveEdge(null, false));
  dispatch(setActiveNode(element.id, true));
  dispatch(setActiveBlockNode(element.id));
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
  dispatch(changeInspectorTab(0));
  if (!inspectorOpen) {
    dispatch(changeInspectorHeight(Size.ModuleOpen));
    SetPanelHeight(inspectorRef, Size.ModuleOpen);
  }
};

export const handleEdgeSelect = (
  element: FlowElement,
  inspectorOpen: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  dispatch(setActiveEdge(element?.id, true));
  dispatch(setActiveNode(null, false));
  dispatch(changeInspectorTab(0));
  if (!inspectorOpen) {
    dispatch(changeInspectorHeight(Size.ModuleOpen));
    SetPanelHeight(inspectorRef, Size.ModuleOpen);
  }
};

export const handleMultiSelect = (dispatch: Dispatch) => {
  dispatch(setActiveNode(null, false));
  dispatch(setActiveEdge(null, false));
};
