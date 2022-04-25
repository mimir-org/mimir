import { Action } from "redux";
import { Size } from "../../../../../compLibrary/size/Size";
import { MODULE_TYPE } from "../../../../../models/project";
import { useAppDispatch } from "../../../../../redux/store";
import { setModuleVisibility } from "../../../../../redux/store/modules/modulesSlice";
import { changeInspectorHeight } from "../../../redux/inspectorSlice";
import { InspectorElement } from "../../../types";
import { InspectorTabBody, InspectorTabHeader, InspectorTabHeaderTitle } from "./InspectorTabWrapper.styled";
import { MutableRefObject, PropsWithChildren, useCallback } from "react";
import { SetPanelHeight } from "../../../helpers/SetPanelHeight";
import { GetInspectorText, GetTabsColor, GetTabId } from "../helpers";

interface Props {
  element?: InspectorElement;
  index: number;
  activeTabIndex: number;
  inspectorTabAction?: (index: number) => Action;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
}

export const InspectorTabWrapper = ({
  element,
  index,
  activeTabIndex,
  inspectorTabAction,
  children,
  inspectorRef,
  isInspectorOpen,
}: PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch();
  const isTabOpen = activeTabIndex === index;

  const onClick = useCallback(() => {
    dispatch(inspectorTabAction(index));
    if (!isInspectorOpen) {
      dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: true, animate: true }));
      dispatch(changeInspectorHeight(Size.MODULE_OPEN));
      SetPanelHeight(inspectorRef, Size.MODULE_OPEN);
    }
  }, [dispatch, inspectorTabAction, index, isInspectorOpen, inspectorRef]);

  return (
    <>
      <InspectorTabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(element)}>
        <InspectorTabHeaderTitle active={isTabOpen}>{GetInspectorText(index)}</InspectorTabHeaderTitle>
      </InspectorTabHeader>

      {isTabOpen && <InspectorTabBody id={GetTabId(index)}>{children}</InspectorTabBody>}
    </>
  );
};
