import { GetInspectorText } from "../helpers";
import { TabEdgeAdminContent } from "../edgeInspector";
import { useCallback } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Edge, Project } from "../../../../models";
import { changeInspectorTab } from "../../../../redux/store/inspector/actions";
import {
  TabHeader,
  TabBody,
  NodeTitle,
  TabTitle,
} from "../../../../compLibrary/box/inspector";

interface Props {
  edge: Edge;
  project: Project;
  index: number;
}

const TabEdgeAdminComponent = ({ edge, project, index }: Props) => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={onClick}>
        {edge && <NodeTitle>{edge.id}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>
      <TabBody>
        {edge && project && (
          <div className="container">
            <TabEdgeAdminContent edge={edge} project={project} />
          </div>
        )}
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={onClick}>
      {edge && <NodeTitle>{edge.id}</NodeTitle>}
      <TabTitle>{GetInspectorText(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabEdgeAdminComponent;
