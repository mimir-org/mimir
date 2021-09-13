import GetInspectorText from "../helpers/GetInspectorText";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "../redux/actions";
import { Edge } from "../../../models";
import { TabEdgeContent } from ".";
import { GetTabsColor } from "../helpers";
import { TabHeader, TabBody, NodeInfo, TabTitle } from "../../inspector/styled";

interface Props {
  edge?: Edge;
  index: number;
}

const TabEdgeComponent = ({ edge, index }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index]?.visible
  ) as boolean;

  const typeEditorState = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isOpen ? (
    <>
      <TabHeader
        active={true}
        onClick={onClick}
        color={GetTabsColor(null, edge)}
      >
        {index === 0 && edge && <NodeInfo>{edge.id}</NodeInfo>}
        {!edge && index === 1 && (
          <span>{typeEditorState.createLibraryType.name} </span>
        )}
        <TabTitle active={true}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      <TabBody>
        <TabEdgeContent edge={edge} index={index} />
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={onClick} color={GetTabsColor(null, edge)}>
      {index === 0 && edge && <NodeInfo>{edge.id}</NodeInfo>}
      {!edge && index === 1 && (
        <span>{typeEditorState.createLibraryType.name} </span>
      )}
      <TabTitle>{GetInspectorText(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabEdgeComponent;
