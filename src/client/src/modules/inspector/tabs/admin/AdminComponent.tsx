import { GetInspectorText, GetTabsColor } from "../../helpers";
import { useCallback } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { EnumBase, Node, Project } from "../../../../models";
import { changeInspectorTab } from "../../redux/tabs/actions";
import { AdminContent } from "./";
import { TabHeader, TabBody, TabTitle } from "../../styled";

interface Props {
  node: Node;
  project: Project;
  index: number;
}

const AdminComponent = ({ node, project, index }: Props) => {
  const dispatch = useDispatch();
  const isTabOpen = useSelector<RootState>((s) => s.inspector.tabs[index].visible) as boolean;
  const statuses = useSelector<RootState>((s) => s.commonState.statuses) as EnumBase[];

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(node, null)}>
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && (
        <TabBody id="admininfo">
          <hr />
          {node && project && (
            <div className="container">
              <AdminContent node={node} project={project} statuses={statuses} />
            </div>
          )}
        </TabBody>
      )}
    </>
  );
};

export default AdminComponent;
