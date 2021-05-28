import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "../../../redux/store/inspector/actions";
import { ATTRIBUTE_TAB, Node } from "../../../models/project";
import {
  TabHeader,
  TabBody,
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

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const handleClick = useCallback(() => {
    dispatch(changeInspectorTab(ATTRIBUTE_TAB.TECH_INFO));
  }, [dispatch]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {index === 0 && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>
      <TabBody>
        <TabContainer>
          <TabContent node={node} />
        </TabContainer>
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
