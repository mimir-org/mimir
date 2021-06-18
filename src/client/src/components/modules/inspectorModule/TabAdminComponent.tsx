import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabAdminContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Contractor } from "../../../redux/store/common/types";
import { Node, Project } from "../../../models";
import { changeInspectorTab } from "../../../redux/store/inspector/actions";
import {
  TabHeader,
  TabBody,
  NodeTitle,
  TabTitle,
} from "../../../compLibrary/box/inspector";

interface Props {
  node: Node;
  project: Project;
  index: number;
}

const TabAdminComponent = ({ node, project, index }: Props) => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const contractors = useSelector<RootState>(
    (state) => state.commonState.contractors
  ) as Contractor[];

  const handleClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>
      <TabBody>
        {node && project && (
          <div className="container">
            <TabAdminContent
              node={node}
              project={project}
              contractors={contractors}
            />
          </div>
        )}
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabAdminComponent;
