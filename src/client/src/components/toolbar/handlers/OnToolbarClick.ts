import { Dispatch } from "redux";
import { toggleElectroView } from "../../../redux/store/electro/electroSlice";
import { setFilterMenuVisibility } from "../../menus/projectMenu/components/subMenus/redux/menuSlice";
import { toggleLocation3D } from "../../../modules/location/redux/location3DSlice";
import { SetCenter, SetViewport } from "react-flow-renderer";
import { SetZoomCenterLevel } from "../../../helpers";
import { Node } from "../../../models";
import { ViewType, VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/flowSlice";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text/TextResources";
import { setSecondaryNode } from "../../../redux/store/secondaryNode/actions";

export const OnElectroClick = (dispatch: Dispatch) => {
  dispatch(toggleElectroView());
};

export const OnFilterClick = (dispatch: Dispatch, open: boolean) => {
  dispatch(setFilterMenuVisibility(!open));
};

export const OnLocation3DClick = (dispatch: Dispatch) => {
  dispatch(toggleLocation3D());
};

export const OnResetZoomClick = (isTreeView: boolean, setViewport: SetViewport, setCenter: SetCenter, secondaryNode: Node) => {
  if (isTreeView) return;
  SetZoomCenterLevel(setViewport, setCenter, secondaryNode !== null);
};

export const OnViewClick = (view: ViewType, numberOfSelectedElements: number, dispatch: Dispatch) => {
  if (view === VIEW_TYPE.BLOCKVIEW && !ValidateBlockViewClick(numberOfSelectedElements, dispatch)) return;

  dispatch(setSecondaryNode(null));
  dispatch(changeFlowView(view));
};

function ValidateBlockViewClick(numberOfSelectedElements: number, dispatch: Dispatch) {
  // BlockView can only be opened when one node is selected
  if (numberOfSelectedElements < 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW }));
    return false;
  }

  // BlockView can not be opened if multiple nodes are selected
  if (numberOfSelectedElements > 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW_MULTISELECT }));
    return false;
  }

  return true;
}
