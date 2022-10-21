import { Action } from "redux";
import { Size } from "../../../../../assets/size/Size";
import { MODULE_TYPE } from "../../../../../models/project";
import { useAppDispatch } from "../../../../../redux/store";
import { setModuleVisibility } from "../../../../../redux/store/modules/modulesSlice";
import { changeInspectorHeight } from "../../../redux/inspectorSlice";
import { InspectorElement } from "../../../types";
import { InspectorTabBody, InspectorTabHeader, InspectorTabHeaderTitle } from "./InspectorTabElement.styled";
import { MutableRefObject, PropsWithChildren, useCallback } from "react";
import { SetPanelHeight } from "../../../helpers/SetPanelHeight";
import { GetInspectorText, GetInspectorTabsColor, GetTabId } from "../helpers";
import { Node } from "@mimirorg/modelbuilder-types";

interface Props {
  element?: InspectorElement;
  index: number;
  activeTabIndex: number;
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
  nodes: Node[];
}

/**
 * Component for one single tab in the Inspector Module.
 * @param props
 * @returns one tab in the Inspector.
 */
export const InspectorTabElement = ({
  element,
  index,
  activeTabIndex,
  changeInspectorTabAction,
  children,
  inspectorRef,
  isInspectorOpen,
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
      <InspectorTabHeader active={isTabOpen} onClick={onClick} color={GetInspectorTabsColor(nodes, element)}>
        <InspectorTabHeaderTitle active={isTabOpen}>{GetInspectorText(index)}</InspectorTabHeaderTitle>
      </InspectorTabHeader>

      {isTabOpen && <InspectorTabBody id={GetTabId(index)}>{children}</InspectorTabBody>}
    </>
  );
};
