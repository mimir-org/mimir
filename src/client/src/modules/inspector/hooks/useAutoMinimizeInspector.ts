import { MutableRefObject, useEffect } from "react";
import { useStoreState } from "react-flow-renderer";
import { SetPanelHeight } from "../helpers";
import { Size } from "../../../compLibrary/size/Size";
import { changeInspectorHeight } from "../redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { useAppDispatch } from "../../../redux/store";
import { MODULE_TYPE } from "../../../models/project";

/**
 * Hook for minimizing inspector panel based on criteria within this hook
 * @param inspectorRef reference to the inspector element which should receive height mutations
 */
export const useAutoMinimizeInspector = (inspectorRef: MutableRefObject<HTMLElement>) => {
  const dispatch = useAppDispatch();
  const numberOfSelectedElements = useStoreState((x) => x.selectedElements?.length);

  useEffect(() => {
    const minimizeCriteria = [numberOfSelectedElements > 1];

    minimizeCriteria.every(Boolean) && SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);

    dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  }, [numberOfSelectedElements, inspectorRef, dispatch]);
};
