import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "../../../redux/store/inspector/actions";
import { Node } from "../../../models/project";
import {
  TabHeader,
  TabBody,
  NodeTitle,
  TabTitle,
} from "../../../compLibrary/box/inspector";

interface Props {
  node: Node;
  index: number;
}

const TabComponent = ({ node, index }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const handleClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {index === 0 && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>

      <TabBody>
        <TabContent node={node} index={index} />
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {index === 0 && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabComponent;
