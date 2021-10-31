import { GetInspectorText, GetTabId, GetTabsColor } from "./helpers";
import { InspectorContent } from ".";
import { useCallback } from "react";
import { useAppDispatch } from "../../redux/store";
import { changeInspectorTab } from "./redux/tabs/actions";
import { TabHeader, TabBody, NodeInfo, TabTitle } from "./styled";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { IsNode } from "./helpers/IsType";
import { Action } from "redux";

interface Props {
  element?: InspectorElement;
  index: number;
  activeTabIndex: number;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  compositeLikeItems?: CompositeLikeItem[];
  changeInspectorTabAction?: (index: number) => Action;
}

const InspectorComponent = ({
  element,
  index,
  activeTabIndex,
  attributeLikeItems,
  terminalLikeItems,
  compositeLikeItems,
  changeInspectorTabAction = changeInspectorTab,
}: Props) => {
  const dispatch = useAppDispatch();
  const isTabOpen = activeTabIndex === index;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTabAction(index));
  }, [dispatch, changeInspectorTabAction, index]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(element)}>
        {index === 0 && IsNode(element) && <NodeInfo>{element.label ?? element.name}</NodeInfo>}
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && (
        <TabBody id={GetTabId(index)}>
          <InspectorContent
            element={element}
            index={index}
            attributeLikeItems={attributeLikeItems}
            terminalLikeItems={terminalLikeItems}
            compositeLikeItems={compositeLikeItems}
          />
        </TabBody>
      )}
    </>
  );
};

export default InspectorComponent;
