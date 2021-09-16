import { GetInspectorColor, GetInspectorText, GetTabsColor } from "../helpers";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { EnumBase, Node, Project } from "../../../models";
import { changeInspectorTab } from "../redux/actions";
import { AdminContent } from ".";
import {
  TabHeader,
  TabBody,
  TabTitle,
} from "../../../compLibrary/box/inspector";

interface Props {
  node: Node;
  project: Project;
  index: number;
}

const AdminComponent = ({ node, project, index }: Props) => {
  const dispatch = useDispatch();

  const isTabOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const statuses = useSelector<RootState>(
    (state) => state.commonState.statuses
  ) as EnumBase[];

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isTabOpen ? (
    <>
      <TabHeader
        active={true}
        onClick={onClick}
        color={GetTabsColor(node, null)}
      >
        <TabTitle active={true}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>
      <TabBody id="admininfo">
        {node && project && (
          <div className="container">
            <AdminContent node={node} project={project} statuses={statuses} />
          </div>
        )}
      </TabBody>
    </>
  ) : (
    <>
      <TabHeader onClick={onClick} color={GetTabsColor(node, null)}>
        <TabTitle>{GetInspectorText(index)}</TabTitle>
      </TabHeader>
      <TabBody id="admininfo"></TabBody>
    </>
  );
};

export default AdminComponent;
