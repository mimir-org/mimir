import { GetInspectorText, GetTabId, GetTabsColor } from "./helpers";
import { InspectorContent } from ".";
import { useCallback } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "./redux/tabs/actions";
import { TabHeader, TabBody, NodeInfo, TabTitle } from "./styled";
import { InspectorElement } from "./types";
import { IsNode } from "./helpers/IsType";

interface Props {
  element?: InspectorElement;
  index: number;
}

const InspectorComponent = ({ element, index }: Props) => {
  const dispatch = useDispatch();
  const isTabOpen = useSelector<RootState>((state) => state.inspector.tabs[index]?.visible) as boolean;

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
