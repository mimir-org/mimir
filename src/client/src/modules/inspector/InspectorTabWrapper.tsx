import { useCallback } from "react";
import { Action } from "redux";
import { Size } from "../../compLibrary/size";
import { MODULE_TYPE } from "../../models/project";
import { useAppDispatch } from "../../redux/store";
import { setModuleVisibility } from "../../redux/store/modules/actions";
import { GetTabsColor, GetInspectorText, GetTabId, SetPanelHeight } from "./helpers";
import { changeInspectorHeight } from "./redux/height/actions";
import { TabHeader, TabTitle, TabBody } from "./styled";
import { InspectorElement } from "./types";

interface Props {
  element?: InspectorElement;
  index: number;
  activeTabIndex: number;
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
}

const InspectorTabWrapper = ({
  element,
  index,
  activeTabIndex,
  changeInspectorTabAction,
  children,
  inspectorRef,
  isInspectorOpen,
}: React.PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch();
  const isTabOpen = activeTabIndex === index;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTabAction(index));
    if (!isInspectorOpen) {
      dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
      dispatch(changeInspectorHeight(Size.ModuleOpen));
      SetPanelHeight(inspectorRef, Size.ModuleOpen);
    }
  }, [dispatch, changeInspectorTabAction, index, isInspectorOpen, inspectorRef]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(element)}>
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && <TabBody id={GetTabId(index)}>{children}</TabBody>}
    </>
  );
};

export default InspectorTabWrapper;
