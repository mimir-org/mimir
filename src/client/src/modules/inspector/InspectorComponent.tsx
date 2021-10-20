import { GetInspectorText, GetTabId, GetTabsColor } from "./helpers";
import { InspectorContent } from ".";
import { useCallback } from "react";
import { makeIsInspectorTabOpenSelector, useAppDispatch, useUniqueParametricAppSelector } from "../../redux/store";
import { changeInspectorTab } from "./redux/tabs/actions";
import { TabHeader, TabBody, NodeInfo, TabTitle } from "./styled";
import { InspectorElement } from "./types";
import { IsNode } from "./helpers/IsType";

interface Props {
  element?: InspectorElement;
  index: number;
}

const InspectorComponent = ({ element, index }: Props) => {
  const dispatch = useAppDispatch();
  const isTabOpen = useUniqueParametricAppSelector(makeIsInspectorTabOpenSelector, index);

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(element)}>
        {index === 0 && IsNode(element) && <NodeInfo>{element.label ?? element.name}</NodeInfo>}
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && (
        <TabBody id={GetTabId(index)}>
          <InspectorContent element={element} index={index} />
        </TabBody>
      )}
    </>
  );
};

export default InspectorComponent;
