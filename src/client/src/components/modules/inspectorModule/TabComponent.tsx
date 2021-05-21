import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspector } from "../../../redux/store/inspector/actions";
import { Node } from "../../../models/project";
import {
  TabHeader,
  TabDataWrapper,
  TabContainer,
  NodeTitle,
  TabTitle,
} from "./styled";

interface Props {
  node: Node;
  index: number;
}

const TabComponent = ({ node, index }: Props) => {
  const dispatch = useDispatch();
  const list = useSelector<RootState>(
    (state) => state.inspector.tabs
  ) as string[];

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const handleClick = useCallback(() => {
    dispatch(changeInspector(index, list));
  }, [dispatch, index, list]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {index === 0 && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>
      <TabDataWrapper>
        <TabContainer>
          <TabContent node={node} />
        </TabContainer>
      </TabDataWrapper>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {index === 0 && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabComponent;
