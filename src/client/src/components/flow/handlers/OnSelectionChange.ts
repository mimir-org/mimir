import { Elements, FlowElement } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size/Size";
import { Project } from "../../../models";
import { MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { changeInspectorHeight, changeInspectorTab } from "../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../redux/store/project/actions";
import { GetBlockEdgeTypes, GetBlockNodeTypes } from "../block/helpers";
import { GetTreeEdgeTypes, GetTreeNodeTypes } from "../tree/helpers";

/**
 * Component to handle selection of Elements in TreeView.
 * @param elements
 * @param project
 * @param inspectorRef
 * @param dispatch
 */
export const OnTreeSelectionChange = (
  elements: Elements,
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  if (elements === null) HandleNoSelect(project, inspectorRef, dispatch);
  else if (elements.length === 1 && GetTreeNodeTypes[elements[0]?.type]) HandleNodeSelect(elements[0], dispatch);
  else if (elements.length === 1 && GetTreeEdgeTypes[elements[0]?.type]) HandleEdgeSelect(elements[0], dispatch);
  else if (elements.length > 1) HandleMultiSelect(dispatch);
};

/**
 * Component to handle selection of Elements in BlockView.
 * @param elements
 * @param project
 * @param inspectorRef
 * @param dispatch
 */
export const OnSelectionChange = (
  elements: Elements,
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  if (elements === null) HandleNoSelect(project, inspectorRef, dispatch, true);
  else if (elements.length === 1 && GetBlockNodeTypes[elements[0]?.type]) HandleNodeSelect(elements[0], dispatch, true);
  else if (elements.length === 1 && GetBlockEdgeTypes[elements[0]?.type]) HandleEdgeSelect(elements[0], dispatch, true);
  else if (elements.length > 1) HandleMultiSelect(dispatch, true);
};

export function HandleNoSelect(
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  isBlock = false
) {
  if (project) {
    isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
    dispatch(setActiveEdge(null, false));
  }

  CloseInspector(inspectorRef, dispatch);
}

export const HandleNodeSelect = (element: FlowElement, dispatch: Dispatch, isBlock = false) => {
  dispatch(setActiveEdge(null, false));
  isBlock ? dispatch(setActiveBlockNode(element.id)) : dispatch(setActiveNode(element.id, true));
  OpenInspector(dispatch);
};

export function HandleEdgeSelect(element: FlowElement, dispatch: Dispatch, isBlock = false) {
  dispatch(setActiveEdge(element?.id, true));
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  OpenInspector(dispatch);
}

export function HandleMultiSelect(dispatch: Dispatch, isBlock = false) {
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  dispatch(setActiveEdge(null, false));
}

export function OpenInspector(dispatch: Dispatch) {
  dispatch(changeInspectorTab(0));
}

export function CloseInspector(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
  SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
}
