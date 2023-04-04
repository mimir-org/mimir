import { Node as FlowNode } from "react-flow-renderer";
import { MutableRefObject, useEffect } from "react";
import { SetPanelHeight } from "../helpers/SetPanelHeight";
import { Size } from "../../../assets/size/Size";
import { changeInspectorHeight } from "../redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { useAppDispatch } from "store";
import { MODULE_TYPE } from "../../../models/project";

/**
 * Hook for minimizing inspector panel based on criteria within this hook.
 * @param inspectorRef reference to the inspector element which should receive height mutations.
 * @param isBlockView
 * @param selectedFlowNodes
 */
export const useAutoMinimizeInspector = (
  inspectorRef: MutableRefObject<HTMLElement>,
  isBlockView: boolean,
  selectedFlowNodes: FlowNode[]
) => {
  const dispatch = useAppDispatch();
  const numberOfSelectedNodes = selectedFlowNodes?.length;

  useEffect(() => {
    if (isBlockView) return;
    const minimizeCriteria = [numberOfSelectedNodes > 1];
    minimizeCriteria.every(Boolean) && SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);

    dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  }, [numberOfSelectedNodes, inspectorRef, isBlockView, dispatch]);
};
