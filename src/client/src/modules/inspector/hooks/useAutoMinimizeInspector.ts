import { MutableRefObject, useEffect } from "react";
import { SetPanelHeight } from "../helpers/SetPanelHeight";
import { Size } from "../../../compLibrary/size/Size";
import { changeInspectorHeight } from "../redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { useAppDispatch } from "../../../redux/store";
import { MODULE_TYPE } from "../../../models/project";
import { GetSelectedNodes } from "../../../helpers/Selected";

/**
 * Hook for minimizing inspector panel based on criteria within this hook.
 * @param inspectorRef reference to the inspector element which should receive height mutations.
 */
export const useAutoMinimizeInspector = (inspectorRef: MutableRefObject<HTMLElement>) => {
  const dispatch = useAppDispatch();
  const selectedNodes = GetSelectedNodes();
  const numberOfSelectedElements = selectedNodes?.length;

  useEffect(() => {
    const minimizeCriteria = [numberOfSelectedElements > 1];
    minimizeCriteria.every(Boolean) && SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);

    dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  }, [numberOfSelectedElements, inspectorRef, dispatch]);
};
