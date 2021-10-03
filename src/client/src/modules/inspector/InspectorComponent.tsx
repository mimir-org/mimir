import { GetInspectorText, GetTabId, GetTabsColor } from "./helpers";
import { InspectorContent } from ".";
import { useCallback } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "./redux/tabs/actions";
import { Node } from "../../models";
import { TabHeader, TabBody, NodeInfo, TabTitle } from "./styled";

interface Props {
  node?: Node;
  index: number;
}

const InspectorComponent = ({ node, index }: Props) => {
  const dispatch = useDispatch();

  const isTabOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index]?.visible
  ) as boolean;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(node, null)}>
        {index === 0 && node && <NodeInfo>{node.label ?? node.name}</NodeInfo>}
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && (
        <TabBody id={GetTabId(index)}>
          <InspectorContent node={node} index={index} />
        </TabBody>
      )}
    </>
  );
};

export default InspectorComponent;
