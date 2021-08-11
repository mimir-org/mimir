import { GetInspectorText } from "../helpers";
import { useCallback } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Contractor } from "../../../../redux/store/common/types";
import { EnumBase, Node, Project } from "../../../../models";
import { changeInspectorTab } from "../../../../redux/store/inspector/actions";
import { AdminContent } from ".";
import {
  TabHeader,
  TabBody,
  NodeTitle,
  TabTitle,
} from "../../../../compLibrary/box/inspector";

interface Props {
  node: Node;
  project: Project;
  index: number;
}

const AdminComponent = ({ node, project, index }: Props) => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const contractors = useSelector<RootState>(
    (state) => state.commonState.contractors
  ) as Contractor[];

  const statuses = useSelector<RootState>(
    (state) => state.commonState.statuses
  ) as EnumBase[];

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={onClick}>
        {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>
      <TabBody>
        {node && project && (
          <div className="container">
            <AdminContent
              node={node}
              project={project}
              contractors={contractors}
              statuses={statuses}
            />
          </div>
        )}
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={onClick}>
      {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      <TabTitle>{GetInspectorText(index)}</TabTitle>
    </TabHeader>
  );
};

export default AdminComponent;
