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

export const handleNoSelect = (
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  isBlock = false
) => {
  if (project) {
    isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
    dispatch(setActiveEdge(null, false));
  }

  CloseInspector(inspectorRef, dispatch);
};

export const handleNodeSelect = (
  element: FlowElement,
  inspectorOpen: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  isBlock = false
) => {
  dispatch(setActiveEdge(null, false));
  isBlock ? dispatch(setActiveBlockNode(element.id)) : dispatch(setActiveNode(element.id, true));
  OpenInspector(inspectorOpen, inspectorRef, isBlock, dispatch);
};

export const handleEdgeSelect = (
  element: FlowElement,
  inspectorOpen: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  isBlock = false
) => {
  dispatch(setActiveEdge(element?.id, true));
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  OpenInspector(inspectorOpen, inspectorRef, isBlock, dispatch);
};

export const handleMultiSelect = (dispatch: Dispatch, isBlock = false) => {
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  dispatch(setActiveEdge(null, false));
};

export const OpenInspector = (
  inspectorOpen: boolean,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  isBlock: boolean,
  dispatch: Dispatch
) => {
  dispatch(changeInspectorTab(0));

  if (!isBlock) {
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));

    if (!inspectorOpen) {
      dispatch(changeInspectorHeight(Size.ModuleOpen));
      SetPanelHeight(inspectorRef, Size.ModuleOpen);
    }
  }
};

export const CloseInspector = (inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) => {
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
  dispatch(changeInspectorHeight(Size.ModuleClosed));
  SetPanelHeight(inspectorRef, Size.ModuleClosed);
};
