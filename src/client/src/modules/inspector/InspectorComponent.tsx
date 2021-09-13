import { GetInspectorText, GetTabsColor } from "./helpers";
import { InspectorContent } from ".";
import { useCallback } from "react";
import { RootState } from "../../redux/store";
import { TypeEditorState } from "../../redux/store/typeEditor/types";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "./redux/actions";
import { Node, Project } from "../../models";
import {
  TabHeader,
  TabBody,
  NodeInfo,
  TabTitle,
} from "../../compLibrary/box/inspector";

interface Props {
  node?: Node;
  index: number;
  project: Project;
}

const InspectorComponent = ({ node, index, project }: Props) => {
  const dispatch = useDispatch();

  const isTabOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index]?.visible
  ) as boolean;

  const typeEditorState = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  // TODO: move
  const getId = () => {
    if (index === 1) return "parameters";
    if (index === 2) return "terminals";
    if (index === 2) return "relations";
  };

  return isTabOpen ? (
    <>
      <TabHeader
        active={true}
        onClick={onClick}
        color={GetTabsColor(node, null)}
      >
        {index === 0 && node && <NodeInfo>{node.label ?? node.name}</NodeInfo>}
        {!node && index === 1 && (
          <span>{typeEditorState.createLibraryType.name} </span>
        )}
        <TabTitle active={true}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      <TabBody id={getId()}>
        <InspectorContent node={node} index={index} project={project} />
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={onClick} color={GetTabsColor(node, null)}>
      {index === 0 && node && <NodeInfo>{node.label ?? node.name}</NodeInfo>}
      {!node && index === 1 && (
        <span>{typeEditorState.createLibraryType.name} </span>
      )}
      <TabTitle>{GetInspectorText(index)}</TabTitle>
    </TabHeader>
  );
};

export default InspectorComponent;