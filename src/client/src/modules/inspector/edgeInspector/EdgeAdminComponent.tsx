import { GetInspectorText, GetTabsColor } from "../helpers";
import { EdgeAdminContent } from ".";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Edge, Project } from "../../../models";
import { changeInspectorTab } from "../redux/actions";
import { TabHeader, TabBody, TabTitle } from "../styled";

interface Props {
  edge: Edge;
  project: Project;
  index: number;
}

const EdgeAdminComponent = ({ edge, project, index }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>((state) => state.inspector.tabs[index].visible) as boolean;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return (
    <>
      <TabHeader active={isOpen} onClick={onClick} color={GetTabsColor(null, edge)}>
        <TabTitle active={isOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>
      {isOpen && (
        <TabBody>
          {edge && project && (
            <div className="container">
              <EdgeAdminContent edge={edge} />
            </div>
          )}
        </TabBody>
      )}
    </>
  );
};

export default EdgeAdminComponent;
