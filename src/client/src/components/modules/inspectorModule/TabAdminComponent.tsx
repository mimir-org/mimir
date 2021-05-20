import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabAdminContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspector } from "../../../redux/store/inspector/actions";
import { Contractor } from "../../../redux/store/common/types";
import { Node, Project } from "../../../models/project";
import {
  TabHeader,
  TabDataWrapper,
  TabContainer,
  NodeTitle,
  TabTitle,
} from "./styled";

interface Props {
  node: Node;
  project: Project;
  index: number;
}

const TabAdminComponent = ({ node, project, index }: Props) => {
  const dispatch = useDispatch();

  const list = useSelector<RootState>(
    (state) => state.inspector.tabs
  ) as string[];

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const contractors = useSelector<RootState>(
    (state) => state.commonState.contractors
  ) as Contractor[];

  const handleClick = useCallback(() => {
    dispatch(changeInspector(index, list));
  }, [dispatch, index, list]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>
      <TabDataWrapper>
        {node && project && (
          <TabContainer>
            <TabAdminContent
              node={node}
              project={project}
              contractors={contractors}
            />
          </TabContainer>
        )}
      </TabDataWrapper>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabAdminComponent;
