import GetInspectorText from "../helpers/GetInspectorText";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "../redux/actions";
import { Edge } from "../../../models";
import { TabEdgeContent } from ".";
import { GetTabsColor } from "../helpers";
import { TabHeader, TabBody, NodeInfo, TabTitle } from "../../inspector/styled";

interface Props {
  edge?: Edge;
  index: number;
}

const TabEdgeComponent = ({ edge, index }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>((state) => state.inspector.tabs[index]?.visible) as boolean;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return (
    <>
      <TabHeader active={isOpen} onClick={onClick} color={GetTabsColor(null, edge)}>
        {index === 0 && edge && <NodeInfo>{edge.id}</NodeInfo>}
        <TabTitle active={isOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>
      {isOpen && (
        <TabBody>
          <TabEdgeContent edge={edge} index={index} />
        </TabBody>
      )}
    </>
  );
};

export default TabEdgeComponent;
