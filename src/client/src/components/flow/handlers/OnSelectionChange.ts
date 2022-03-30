import { Node as FlowNode } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size/Size";
import { Project } from "../../../models";
import { MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight, changeInspectorTab } from "../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../redux/store/project/actions";

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

export const handleNodeSelect = (flowNode: FlowNode, dispatch: Dispatch, isBlock = false) => {
  dispatch(setActiveEdge(null, false));
  isBlock ? dispatch(setActiveBlockNode(flowNode.id)) : dispatch(setActiveNode(flowNode.id, true));
  OpenInspector(dispatch);
};

export const handleEdgeSelect = (flowNode: FlowNode, dispatch: Dispatch, isBlock = false) => {
  dispatch(setActiveEdge(flowNode?.id, true));
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  OpenInspector(dispatch);
};

export const handleMultiSelect = (dispatch: Dispatch, isBlock = false) => {
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  dispatch(setActiveEdge(null, false));
};

export const OpenInspector = (dispatch: Dispatch) => {
  dispatch(changeInspectorTab(0));
};

export const CloseInspector = (inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) => {
  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
  SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
};
