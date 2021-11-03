import { useCallback } from "react";
import { Action } from "redux";
import { useAppDispatch } from "../../redux/store";
import { GetTabsColor, GetInspectorText, GetTabId } from "./helpers";
import { TabHeader, TabTitle, TabBody } from "./styled";
import { InspectorElement } from "./types";

interface Props {
  element?: InspectorElement;
  index: number;
  activeTabIndex: number;
  changeInspectorTabAction?: (index: number) => Action;
}

const InspectorTabWrapper = ({
  element,
  index,
  activeTabIndex,
  changeInspectorTabAction,
  children,
}: React.PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch();
  const isTabOpen = activeTabIndex === index;
  const onClick = useCallback(() => {
    dispatch(changeInspectorTabAction(index));
  }, [dispatch, changeInspectorTabAction, index]);

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
