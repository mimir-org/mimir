import { Action } from "redux";
import { Size } from "../../../../../assets/size/Size";
import { MODULE_TYPE } from "../../../../../models/project";
import { useAppDispatch } from "../../../../../redux/store";
import { setModuleVisibility } from "../../../../../redux/store/modules/modulesSlice";
import { changeInspectorHeight } from "../../../redux/inspectorSlice";
import { InspectorElement } from "../../../types";
import { InspectorTabBody, InspectorTabHeader, InspectorTabHeaderTitle } from "./InspectorTabWrapper.styled";
import { MutableRefObject, PropsWithChildren, useCallback } from "react";
import { SetPanelHeight } from "../../../helpers/SetPanelHeight";
import { GetInspectorText, GetInspectorTabsColor, GetTabId } from "../helpers";
import { Node } from "../../../../../models";

interface Props {
  element?: InspectorElement;
  index: number;
  activeTabIndex: number;
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
  isOffPage: boolean;
  nodes: Node[];
}

export const InspectorTabWrapper = ({
  element,
  index,
  activeTabIndex,
  changeInspectorTabAction,
  children,
  inspectorRef,
  isInspectorOpen,
  isOffPage,
  nodes,
}: PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch();
  const isTabOpen = activeTabIndex === index;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTabAction(index));
    if (isInspectorOpen) return;

    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: true, animate: true }));
    dispatch(changeInspectorHeight(Size.MODULE_OPEN));
    SetPanelHeight(inspectorRef, Size.MODULE_OPEN);
  }, [dispatch, changeInspectorTabAction, index, isInspectorOpen, inspectorRef]);

  return (
    <>
      <InspectorTabHeader active={isTabOpen} onClick={onClick} color={GetInspectorTabsColor(nodes, element, isOffPage)}>
        <InspectorTabHeaderTitle active={isTabOpen}>{GetInspectorText(index)}</InspectorTabHeaderTitle>
      </InspectorTabHeader>

      {isTabOpen && <InspectorTabBody id={GetTabId(index)}>{children}</InspectorTabBody>}
    </>
  );
};
